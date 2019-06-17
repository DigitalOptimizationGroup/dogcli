/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {apiClient} from '../api'
import {getProjectId} from '../get-project-id'
const logSymbols = require('log-symbols')

export default class AddDomain extends Command {
  static description =
    'create invite link/code for developer preview (allows someone else to create their own account)'

  async run() {
    const API = apiClient(this)

    const projectId = getProjectId()

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
