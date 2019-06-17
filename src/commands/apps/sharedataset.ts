/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {apiClient} from '../../api'
import {getProjectId} from '../../get-project-id'
const logSymbols = require('log-symbols')

export default class ShareDataset extends Command {
  static description =
    'share your BigQuery dataset with an email address associated with a Google Cloud Account'

  static args = [{name: 'email', required: true}]

  async run() {
    const API = apiClient(this)
    const {args} = this.parse(ShareDataset)

    const projectId = getProjectId()

    const response = await API.post(
      `/api/v1/share-dataset`,
      {targetEmail: args.email},
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
        return response.data
      })
      .catch(err => {
        this.log('Failed, please rerun.')
        process.exit()
      })

    this.log()
    this.log(
      logSymbols.success,
      `Success! The email ${
        args.email
      } should now have access to your BigQuery dataset.`
    )
    this.log()
  }
}
