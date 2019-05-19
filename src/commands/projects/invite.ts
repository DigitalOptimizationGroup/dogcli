import {Command} from '@oclif/command'
import {apiClient} from '../../api'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')

export default class AddDomain extends Command {
  static description =
    'create an invite link you can use to allow another to create their own project in developer preview'

  async run() {
    const API = apiClient(this)

    const projectId = configstore.get('projectId')

    const response = await API.post(
      `/api/v1/create-invite`,
      {},
      {
        params: {
          projectId
        }
      }
    )
      .then(response => {
        if (response.data.error) {
          this.log(response.data.error)
          process.exit()
        }
        if (response.status === 402) {
          this.log()
          this.log(logSymbols.error, response.data.message)
          this.log()
          process.exit()
        }
        return response.data
      })
      .catch(err => {
        this.log('Failed, please rerun.')
        process.exit()
      })

    this.log()
    this.log(
      logSymbols.success,
      'Invite Link Created!',
      `You've created ${response.given} of ${response.allowed}.`
    )
    this.log()
    this.log(response.inviteLink)
    this.log()
  }
}
