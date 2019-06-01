import mime from 'mime'
import assets from '../../tmp-dog-build/client-assets'
import {cache} from './cache'
import preCacheManifest from '../../tmp-dog-build/pre-cache-manifest.json'
import {functions} from '../../tmp-dog-build/functions'
import {performanceHead, performanceScript} from './performance-scripts'
const cookie = require('cookie')
const querystring = require('querystring')

// could load this script from the API when building and
// not bundle it with the CLI

// https://github.com/mhart/aws4fetch/tree/master/example

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

/*
let's say someone can make an SSR function and include it in their files and we wrap it with the 
required stuff and pass data to it or a function that can get data and in dev it get's it from the network. 

I don't think we want to do this in the cli - maybe for the dev server we want to make a network request to 
get the script because this really locks us into a particular script. We should be able to update running
scripts of our users if something needs to be changed, like a critical security patch. That means we need 
to save the raw assets of each release to s3 so we can always build from them.

And maybe during dev we should have our proxy here as well so that someone can test out their configs and stuff.
*/
async function handleRequest(event) {
  const request = event.request
  const {pathname, search} = new URL(request.url)

  const {headers} = request

  const cookies = cookie.parse(headers.get('Cookie') || '')

  // use the request Id for userId if it's the first request
  const userId = cookies['_vq'] || headers.get('request-id')

  const params = querystring.parse(search.split('?')[1] || '')

  // Gatekeeping gate - should we only allow access through the proxy?
  // if (params.origintoken !== 'abc') {
  //   return new Response('403 Forbidden', {
  //     status: 403,
  //     headers: new Headers({
  //       'content-type': 'text/html',
  //       'cache-control': 'no-cache'
  //     })
  //   })
  // }

  const logRecord = {
    projectId: PROJECT_ID,
    vid: userId,
    rid: headers.get('request-id'),
    timestamp: Date.now(),
    appHash: APP_HASH,
    color: COLOR
    // what will this be? sha1 of code that is saved to s3?
  }
  event.waitUntil(
    // waitUntil assures that this request gets to complete, but does not block
    fetch(`https://analytics.digitaloptgroup.com/server-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(logRecord)
    })
  )

  if (functions[pathname] !== undefined) {
    return await functions[pathname](event)
  } else {
    // this needs routes as well, because this will break right now unless we serve index.thml
    // for anything that we don't find?
    const appPaths = Object.keys(preCacheManifest)
    const assetToServe = `/build${
      appPaths.indexOf(pathname) > -1 ? '/index.html' : pathname
    }`

    const responseString = assets[assetToServe]
      ? pathname.match(/\.(ico|gif|png|jpe?g|svg)$/i) !== null
        ? new Buffer(assets[assetToServe], 'base64')
        : assets[assetToServe]
      : '404 - Not Found'

    if (assetToServe === '/build/index.html') {
      const placeHolder = `<div id="root"></div>` //"{{__APP_CACHE__}}";
      const cacheData = await cache(pathname, userId, preCacheManifest)

      const requestContext = {
        rid: headers.get('request-id'),
        vid: userId,
        startTimestamp: Date.now(),
        projectId: PROJECT_ID,
        gifLoggerUrl: 'https://analytics.digitaloptgroup.com/gen-204',
        color: COLOR
      }

      return new Response(
        responseString
          // inject into the head
          .replace(
            '<head>',
            `<head><script>window.__APP_CONFIG__=${JSON.stringify(
              requestContext
            )}</script>` //<script>${performanceHead}</script>`
          )
          // inject into the body
          .replace(
            placeHolder,
            `${placeHolder}<script>window.__APP_CACHE__=${JSON.stringify(
              cacheData
            )}</script>` //<script>${performanceScript}</script>`
          ),
        {
          status: assets[assetToServe] ? 200 : 404,
          headers: new Headers({
            'content-type': 'text/html',
            'cache-control': 'no-cache'
          })
        }
      )
    }

    const res = new Response(responseString, {
      status: assets[assetToServe] ? 200 : 404,
      headers: new Headers({
        'content-type': mime.getType(assetToServe)
      })
    })

    if (pathname === '/' || pathname.includes('service-worker.js')) {
      res.headers.set('cache-control', 'no-cache')
    } else {
      res.headers.set('cache-control', 'public, max-age=31536000')
    }

    return res
  }
}
