import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import {cli} from 'cli-ux'
const logSymbols = require('log-symbols')
const clc = require('cli-color')

export default class Gatekeep extends Command {
  static description = 'create a gatekeeping url to any given origin'

  static flags = {
    
  }

  static args = [
    {
      name: 'origin',
      required: true,
      description: 'a valid deployed color or a fully qualified domain name'
    }
  ]

  async run() {
    const {args} = this.parse(Gatekeep)
    const API = apiClient(this)
    const projectId = configstore.get('projectId')

    this.log('Generating gatekeeping url...')

    await API.post(
      `/api/v1/gatekeeping`,
      {origin: args.origin},
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
        this.log(clc.bold(`${response.data}`))
        this.log()

        if (process.platform === 'linux') {
          cli.open(response.data, {app: 'xdg-open'}).catch(() => {})
        } else {
          cli.open(response.data).catch(() => {})
        }
      })
      .catch(err => {
        this.log('err', err)
      })
  }
}
