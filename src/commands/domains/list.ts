/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {getProjectId} from '../../get-project-id'
import {apiClient} from '../../api'

export default class ListDomains extends Command {
  static description = `list all domains associated with this app`

  static flags = {}

  static args = []

  public async run() {
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log()
    this.log('Refreshing domains list...')
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

    if (domains.length > 0) {
      domains.forEach((projectId: string) => {
        this.log(projectId)
      })
    } else {
      this
        .log(`Your App ${projectId} does not have any custom domains associated with it. 

For information on adding a domain see:

dog domains:add --help`)
    }

    this.log()
  }
}
