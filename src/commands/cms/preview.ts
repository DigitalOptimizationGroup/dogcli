import {Command, flags} from '@oclif/command'
import {apiClient} from '../../api'
import {cli} from 'cli-ux'
const clc = require('cli-color')
import {getProjectId} from '../../get-project-id'

export default class Gatekeep extends Command {
  static description = 'generate a preview link to a chosen domain'

  static examples = [
    `$ dog cms:preview http://localhost:3000

$ dog cms:preview https://www.example.com
`
  ]

  static flags = {}

  static args = [
    {
      name: 'url',
      required: true,
      description: 'must be a fully qualified domain name',
      default: 'http://localhost:3000'
    }
  ]

  async run() {
    const {args} = this.parse(Gatekeep)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log('Generating Preview url...')

    await API.post(
      `/api/v1/cms-preview-url`,
      {url: args.url},
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
          `Visit this URL to access the Preview (will attempt to automatically open it now):
          `
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
        this.log(
          'There was an error, please try again or contact us. Error Id: ',
          err.data
        )
      })
  }
}
