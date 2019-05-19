import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import * as inquirer from 'inquirer'

export default class Projects extends Command {
  static description = `list all projects in your account`

  static flags = {}

  static args = []

  public async run() {
    const API = apiClient(this)

    this.log()
    this.log('Refreshing projects list...')
    this.log()

    await API.post(`/api/v1/refresh-projects`)
      .then(response => {
        configstore.set('projects', response.data)
      })
      .catch(err => {
        console.log('err', err)
      })

    const projects = configstore.get('projects') || []
    projects.forEach((projectId: string) => {
      this.log(projectId)
    })
    this.log()
  }
}
