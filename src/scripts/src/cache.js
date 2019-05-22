import stableStringify from 'fast-stable-stringify'
import sha1 from 'sha1'

const resolve = async ({userId, queryName, args}) => {
  return Promise.resolve([
    `${queryName}_${sha1(stableStringify(args))}`,
    await fetch(
      `https://api-${PROJECT_ID}.edgeyates.com/resolve-feature/${queryName}?userId=${userId}&args=${encodeURIComponent(
        JSON.stringify(args)
      )}`
    )
      .then(data => data.json())
      .catch(err => {
        console.log(err)
      })
  ])
}

export const cache = (pathname, userId, preCacheManifest) => {
  if (preCacheManifest[pathname]) {
    return Promise.all(
      preCacheManifest[pathname].map(({queryName, args}) => {
        return resolve({
          userId,
          queryName,
          args
        })
      })
    ).then(features => {
      // filter out any errors
      return features
        .filter(([featureId, feature]) => feature.assignment)
        .reduce((acc, item) => {
          return {
            ...acc,
            [item[0]]: item[1]
          }
        }, {})
    })
  }
  return Promise.resolve({})
}
