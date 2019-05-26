import {Command, flags} from '@oclif/command'
import {apiClient, processResponse} from '../../api'
import * as inquirer from 'inquirer'
import {cli} from 'cli-ux'
import {AxiosResponse} from 'axios'
import {getProjectId} from '../../get-project-id'

export default class RollbackProxy extends Command {
  static description = `rollback proxy to a prior deployment`
  static flags = {}
  static args = []

  public async run() {
    const {args, flags} = this.parse(RollbackProxy)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log()
    this.log('Refreshing list of proxy deployments...')
    this.log()

    const deployments: Array<any> = await API.post(
      `/api/v1/refresh-proxy-deployment-list`,
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
      this.log(`There are no prior deployments for your proxy, exiting...`)
      this.log()
      process.exit()
    }

    const answer: {name: string} = await inquirer.prompt([
      {
        type: 'list',
        name: 'name',
        message: `Select a deployment to rollback proxy:`,
        choices: deployments.map(
          item =>
            `${item.name} deployed ${JSON.stringify(item.config)} on ${
              item.date
            }`
        )
      }
    ])

    const [selectedDeploy] = deployments.filter(
      item =>
        `${item.name} deployed ${JSON.stringify(item.config)} on ${
          item.date
        }` === answer.name
    )

    this.log(`
    
Rolling back proxy:

target project:  [${projectId}]

rolling back to:
  config:        ${JSON.stringify(selectedDeploy.config)}
  deployed by:   [${selectedDeploy.name}]
  deployed on:   [${selectedDeploy.date}]

`)

    const response = await cli.prompt(
      "Enter 'yes' to rollback (only 'yes' will be accepted)"
    )

    if (response === 'yes') {
      const intervalId = setInterval(() => {
        this.log('Rolling back proxy...')
      }, 3000)

      const rollbackId = selectedDeploy.id

      const res = await new Promise<AxiosResponse<any>>((resolve, reject) => {
        API.post(`/api/v1/rollback-proxy`, '', {
          params: {
            projectId,
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
        this.log(`Rollback of proxy completed successfully`)
      })
    } else {
      this.log('Exiting without rolling back...')
    }
  }
}
