import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import {cli} from 'cli-ux'
const clc = require('cli-color')
import * as ngrok from 'ngrok'
import * as localtunnel from 'localtunnel'
import * as uuid from 'uuid'

export default class Localhost extends Command {
  static description =
    '(experimental) create a gatekeeping url that tunnels to your local development server'

  static flags = {}

  static args = [
    {
      name: 'port',
      default: '3000',
      description: 'the port of your local server'
    }
  ]

  async run() {
    const {args} = this.parse(Localhost)
    const API = apiClient(this)
    const projectId = configstore.get('projectId')

    this.log()
    this.log('This is an EXPERIMENTAL feature')
    this.log()

    this.log('Creating SSH tunnel...')

    // const subdomain = uuid()

    // const url = await new Promise((res, rej) => {
    //   localtunnel(args.port, {subdomain}, (err: any, tunnel: any) => {
    //     res(tunnel.url)
    //   })
    // })

    // console.log('url', url)

    const url = await ngrok.connect({
      port: args.port
      //  authtoken: '' // make optional for own ngrok account
    })

    this.log('Generating gatekeeping url...')

    await API.post(
      `/api/v1/gatekeeping`,
      {origin: url},
      {
        params: {
          projectId
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
      .then(response => {
        this.log()
        this.log(
          `Visit this URL to access ${
            args.origin
          } (will attempt to automatically open it now):`
        )
        this.log(clc.bold(`${response.data}&nocache=yes`))
        this.log()

        if (process.platform === 'linux') {
          cli
            .open(`${response.data}&nocache=yes`, {app: 'xdg-open'})
            .catch(() => {})
        } else {
          cli.open(`${response.data}&nocache=yes`).catch(() => {})
        }
      })
      .catch(err => {
        this.log('err', err)
      })

    this.log()
    this.log(
      `This terminal is running a tunnel to localhost:${
        args.port
      }, closing it will kill the process.`
    )
    this.log()
  }
}
