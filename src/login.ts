import * as http from 'http'
import * as fs from 'fs'
const portfinder = require('portfinder')
var url = require('url')
var path = require('path')
var clc = require('cli-color')
import {cli} from 'cli-ux'
import * as uuid from 'uuid/v4'
import {auth} from './auth'
const logSymbols = require('log-symbols')

portfinder.basePort = 9012

const respondWithFile = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  statusCode: number,
  filename: string
) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, filename), (err, response) => {
      if (err) {
        return reject(err)
      }
      res.writeHead(statusCode, {
        'Content-Length': response.length,
        'Content-Type': 'text/html'
      })
      res.end(response)
      req.socket.destroy()
      return resolve()
    })
  })
}

const loginWithLocalhost = (port: number, state: string, authUrl: string) => {
  return new Promise((resolve, reject) => {
    const server = http.createServer((req, res) => {
      const query = url.parse(req.url, true).query || {}
      if (query.state === state && query.token) {
        respondWithFile(req, res, 200, './templates/success.html')
          .then(() => {
            auth.set('token', query.token)
            server.close()
            console.log()
            console.log(
              logSymbols.success,
              "You've successfully authenticated the cli!"
            )
            resolve()
            process.exit()
          })
          .catch(() => {
            return respondWithFile(req, res, 400, '../templates/failure.html')
          })
      } else {
        return respondWithFile(req, res, 400, './templates/failure.html')
      }
    })

    server.listen(port, () => {
      console.log()
      console.log(
        'Visit this URL to log in (will attempt to automatically open it now):'
      )
      console.log(clc.bold.underline(authUrl))
      console.log()
      console.log('Waiting for authentication...')

      if (process.platform === 'linux') {
        cli.open(authUrl, {app: 'xdg-open'}).catch(e => {
          //console.log(e)
        })
      } else {
        cli.open(authUrl).catch(e => {
          //console.log(e)
        })
      }
    })

    server.on('error', () => {
      console.log(
        logSymbols.error,
        'Failed to login. Please try again or email support@digitaloptgroup.com'
      )
      resolve()
      process.exit()
    })
  })
}

export const login = (baseURL: string) => {
  return portfinder
    .getPortPromise()
    .then((port: number) => {
      const state = uuid()
      const authUrl = `${baseURL}/api/v1/login?state=${state}&redirectPort=${port}`
      return loginWithLocalhost(port, state, authUrl)
    })
    .catch(() => {
      console.log(
        logSymbols.error,
        'Failed to login. Please try again or email support@digitaloptgroup.com'
      )
    })
}
