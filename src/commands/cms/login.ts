import {Command, flags} from '@oclif/command'
import {apiClient} from '../../api'
import {cli} from 'cli-ux'
const clc = require('cli-color')
import {getProjectId} from '../../get-project-id'

export default class Gatekeep extends Command {
  static description = 'login & open the cms UI'

  static flags = {}

  static args = []

  async run() {
    const {args} = this.parse(Gatekeep)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log('Generating CMS login url...')

    await API.post(`/api/v1/cms-login-url`, '', {
      params: {
        projectId
      },
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        this.log()
        this.log(
          `Visit this URL to access the CMS (will attempt to automatically open it now):`
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
