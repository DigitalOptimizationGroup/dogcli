import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import * as inquirer from 'inquirer'
import {cli} from 'cli-ux'
import * as fs from 'fs'
import {askForScriptPath} from '../../ask-for-script-path'

export default class Projects extends Command {
  static description = `initalize an app in this directory (should be the root of your project)`

  static flags = {}

  static args = []

  public async run() {
    const API = apiClient(this)

    if (configstore.get('projectId') !== undefined) {
      this.log()
      this.log(
        'This directory has already been initialized, doing so again will overwrite the current configuration.'
      )
      this.log()

      const response = await cli.prompt(
        'Are you sure you want to initialize this directory again? (only "yes" will be accepted)'
      )

      if (response !== 'yes') {
        this.log('Exiting...')
        process.exit(1)
      }
      configstore.clear()
    }

    this.log()
    this.log('Refreshing apps list...')
    this.log()

    const apps = await API.post(`/api/v1/refresh-projects`)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log('err', err)
      })

    const answer: {appId: string; script: string} = await inquirer.prompt([
      {
        type: 'list',
        name: 'appId',
        message: "Select the app you'd like to use for deployment:",
        choices: apps.projects
      },
      {
        type: 'list',
        name: 'script',
        message: 'Select an App type:',
        choices: apps.appTypes
      }
    ])

    const appType = apps.appTypes.find(
      (app: {name: string}) => app.name === answer.script
    ).id

    var scriptPath: string = ''
    if (appType === 'rawWorker') {
      scriptPath = await askForScriptPath()
      configstore.set('scriptPath', scriptPath)
    }

    if (appType === 'cra') {
      fs.appendFileSync(
        '.env',
        `
REACT_APP_DOG_PROJECT_ID=${answer.appId}
REACT_APP_DOG_API_URL=https://api-${answer.appId}.edgeyates.com
REACT_APP_DOG_API_KEY=developer-preview-${answer.appId}
`
      )
    }

    configstore.set('projectId', answer.appId)
    configstore.set('appType', appType)

    this.log()
    this.log(
      `Successfully configured this directory:

app Id:       [${answer.appId}]
app type:     [${answer.script}] ${
        appType === 'rawWorker' ? `\nScript path:  [${scriptPath}]` : ''
      }
`
    )
    this.log()
  }
}
