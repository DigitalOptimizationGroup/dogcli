import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import * as inquirer from 'inquirer'
import {cli} from 'cli-ux'

export default class RollbackApp extends Command {
  static description = `rollback to a prior deployment`

  static flags = {}

  static args = [{name: 'color', required: true}]

  public async run() {
    const {args, flags} = this.parse(RollbackApp)
    const API = apiClient(this)
    const projectId = configstore.get('projectId')

    this.log()
    this.log('Refreshing deployment list...')
    this.log()

    const deployments: Array<any> = await API.post(
      `/api/v1/refresh-app-deployment-list`,
      '',
      {
        params: {
          color: args.color,
          projectId,
          force: flags.force
        }
      }
    )
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log('err', err)
      })

    const answer: {name: string} = await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: 'Select a deployment to rollback to:',
        choices: deployments.map(
          item => `${item.name} deployed ${item.scriptHash} on ${item.date}`
        )
      }
    ])

    const [selectedDeploy] = deployments.filter(
      item =>
        `${item.name} deployed ${item.scriptHash} on ${item.date}` ===
        answer.name
    )

    this.log(`
    
Rolling back:

target project:  [${projectId}]
target color:    [${args.color}]

rolling back to:
  hash:          [${selectedDeploy.scriptHash}]
  deployed by:   [${selectedDeploy.name}]
  deployed on:   [${selectedDeploy.date}]

force flag:      [${flags.force ? true : false}]

`)

    const response = await cli.prompt(
      "Enter 'yes' to rollback (only 'yes' will be accepted)"
    )

    if (response === 'yes') {
      this.log('Rolling back now...')
      this.log()
    }
  }
}
