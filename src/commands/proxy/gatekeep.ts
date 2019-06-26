/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import {cli} from 'cli-ux'
const logSymbols = require('log-symbols')
const clc = require('cli-color')
import * as inquirer from 'inquirer'

export default class Gatekeep extends Command {
  static description = 'create a gatekeeping url to any given origin'

  static examples = [
    `$ dog proxy:gatekeep blue

# Gatekeep and open preview mode of the CMS
$ dog proxy:gatekeep blue --cmsPreview

# Gatekeep to any FQDN on the internet
$ dog proxy:gatekeep https://www.example.com
`
  ]

  static flags = {
    cmsPreview: flags.boolean()
  }

  static args = [
    {
      name: 'origin',
      required: true,
      description: 'a valid deployed color or a fully qualified domain name'
    }
  ]

  async run() {
    const {args, flags} = this.parse(Gatekeep)
    const API = apiClient(this)
    const projectId = configstore.get('projectId')

    this.log()
    this.log('Refreshing list of domains...')
    this.log()

    const {domains} = await API.post(`/api/v1/list-domains`, '', {
      params: {projectId}
    })
      .then(response => {
        if (response.status !== 200) {
          console.log('Error, please try again.')
          process.exit()
        }
        return response.data || {}
      })
      .catch(err => {
        console.log('Error, please try again.')
        process.exit()
      })

    const answer: {name: string} = await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: `Select a domain to gatekeep through:`,
        choices: [...domains, `${projectId}.edgebayes.com`]
      }
    ])

    this.log()
    this.log('Generating gatekeeping url...')

    await API.post(
      `/api/v1/gatekeeping`,
      {
        gatekeepThrough: `https://${answer.name}`,
        origin: args.origin,
        cmsPreview: flags.cmsPreview
      },
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
