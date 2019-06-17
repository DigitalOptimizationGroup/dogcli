/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command, flags} from '@oclif/command'
import {apiClient, processResponse} from '../../api'
import * as inquirer from 'inquirer'
import {cli} from 'cli-ux'
import {AxiosResponse} from 'axios'
import {getProjectId} from '../../get-project-id'

export default class RollbackColor extends Command {
  static description = `rollback a color to a prior deployment`

  static flags = {force: flags.boolean()}

  static args = [{name: 'color', required: true}]

  public async run() {
    const {args, flags} = this.parse(RollbackColor)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log()
    this.log('Refreshing deployment list...')
    this.log()

    const deployments: Array<any> = await API.post(
      `/api/v1/refresh-colors-deployment-list`,
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
        if (response.status === 403) {
          this.log('PERMISSION DENIED')
          process.exit()
        } else if (response.status !== 200) {
          this.log('There was an error, please try again.')
          process.exit()
        }
        return response.data
      })
      .catch(err => {
        console.log('err', err)
      })

    if (deployments.length === 0) {
      this.log(`There are no prior deployments for ${args.color}, exiting...`)
      this.log()
      process.exit()
    }

    const answer: {name: string} = await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: `Select a deployment to rollback blue:`,
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
      const intervalId = setInterval(() => {
        this.log(`Rolling back ${args.color}...`)
      }, 3000)

      const rollbackId = selectedDeploy.id

      const res = await new Promise<AxiosResponse<any>>((resolve, reject) => {
        API.post(`/api/v1/rollback-color`, '', {
          params: {
            color: args.color,
            projectId,
            force: flags.force,
            rollbackId
          }
        })
          .then(res => {
            clearInterval(intervalId)
            resolve(res)
          })
          .catch(err => {
            console.log(
              'Sorry that failed, you could try it again or send us this id: ',
              err.response.data
            )
            clearInterval(intervalId)
          })
      })

      processResponse(this, res, () => {
        this.log(`Rollback completed successfully: ${args.color} backend`)
      })
    } else {
      this.log('Exiting without rolling back...')
    }
  }
}
