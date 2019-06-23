/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import {cli} from 'cli-ux'
const clc = require('cli-color')
import * as ngrok from 'ngrok'
import {getProjectId} from '../../get-project-id'

export default class Localhost extends Command {
  static description =
    '(experimental) create a gatekeeping url that tunnels to your local development server'

  static examples = [
    `$ dog proxy:localhost

# Tunnel to a custom port (default 3000)
$ dog proxy:localhost 3001

# Include preview mode of the CMS
$ dog proxy:localhost 3001 --cmsPreview
`
  ]

  static flags = {cmsPreview: flags.boolean()}

  static args = [
    {
      name: 'port',
      default: '3000',
      description: 'the port of your local server'
    }
  ]

  async run() {
    const {args, flags} = this.parse(Localhost)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log()
    this.log('This is an EXPERIMENTAL feature')
    this.log()

    if (flags.cmsPreview) {
      this.log(`

CMS preview with gatekeeping is currently under development. Generating normal gatekeeping URL...

`)
    }

    this.log('Creating SSH tunnel...')

    var url = ''
    try {
      url = await ngrok.connect({
        port: args.port
        //  authtoken: '' // make optional for own ngrok account
      })
    } catch (e) {
      this.log(`
Failed to create tunnel.

Make sure you're not already running a tunnel in aother tab. 
      
Please try again or contact us.
`)
      process.exit()
    }

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
        if (response.status === 200) {
          this.log()
          this.log(
            `Visit this URL to access your development server (will attempt to automatically open it now):`
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
        } else {
          this.log()
          this.log(
            'Failed to generate Gatekeeping URL. Please try again or contact us.'
          )
          this.log()
          process.exit()
        }
      })
      .catch(err => {
        this.log('err', err)
        process.exit()
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
