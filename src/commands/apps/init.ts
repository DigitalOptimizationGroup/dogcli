import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import * as inquirer from 'inquirer'
import {cli} from 'cli-ux'
import * as fs from 'fs'
import {askForScriptPath} from '../../ask-for-script-path'
import {execSync} from '../../exec-sync'
const logSymbols = require('log-symbols')
var npm = require('npm-programmatic')
const path = require('path')

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

    const appTypes = [
      {name: 'Raw Script', value: 'rawWorker'},
      {name: 'Application Script', value: 'appScript'}
    ]

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
        choices: appTypes //apps.appTypes
      }
    ])

    const appType = answer.script

    configstore.set('projectId', answer.appId)
    configstore.set('appType', appType)

    var scriptPath: string = ''

    if (appType === 'rawWorker') {
      scriptPath = await askForScriptPath()
      configstore.set('scriptPath', scriptPath)

      this.log()
      this.log(
        `Successfully configured this directory:

app Id:       [${answer.appId}]
app type:     [rawWorker]
`
      )
    } else {
      const npmTemplate = '@digitaloptgroup/adn-apps-cra'
      configstore.set('npmTemplate', npmTemplate)

      const moduleInstalled = fs.existsSync(
        path.join(process.cwd(), 'node_modules', npmTemplate)
      )

      if (!moduleInstalled) {
        try {
          this.log()
          this.log('Installing dependencies...')
          const useYarn = fs.existsSync(path.join(process.cwd(), 'yarn.lock'))

          if (useYarn) {
            execSync(`yarnpkg`, ['add', npmTemplate])
          } else {
            execSync(`npm`, ['install', '--save', npmTemplate])
          }
        } catch (e) {
          this.log()
          this.log(
            logSymbols.error,
            'Unable to install dependencies, please check your details and try again.'
          )
          this.log()
          process.exit()
        }
      }
      const appModule = require(path.join(
        process.cwd(),
        'node_modules',
        npmTemplate
      ))

      const {initApp} = appModule

      await initApp()
      this.log()
      this.log(
        `Successfully configured this directory:

app Id:       [${answer.appId}]
app type:     [${appType}]
app template: [${npmTemplate}]

To build your app run:

dog apps:build
`
      )
    }

    this.log()
  }
}
