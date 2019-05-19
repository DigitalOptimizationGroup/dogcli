import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import * as inquirer from 'inquirer'

export default class Projects extends Command {
  static description = `select a project`

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

    const answer: {projectId: string} = await inquirer.prompt([
      {
        type: 'list',
        name: 'projectId',
        message: 'Select a project:',
        choices: configstore.get('projects'),
        default: configstore
          .get('projects')
          .indexOf(configstore.get('projectId'))
      }
    ])

    configstore.set('projectId', answer.projectId)

    this.log()
    this.log(`Successfully selected projectId: ${configstore.get('projectId')}`)
    this.log()
  }
}
