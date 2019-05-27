import {apiClient, processResponse} from '../src/api'
import {createHash} from 'crypto'
import {AxiosResponse} from 'axios'
import {Command, flags} from '@oclif/command'
import {build} from '../src/build'
import {configstore} from '../src/configstore'
import {cli} from 'cli-ux'
import * as inquirer from 'inquirer'
import * as chalk from 'chalk'
import * as fs from 'fs'

const getProjectName = async (name: string) => {
  return name + '392934'
}

const createNewApp = async (projectType: string) => {
  const {name} = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What name would you like to use?',
      default: 'blue-tiger-254'
    }
  ])
  const projectId = await getProjectName(name)
  console.log('projectID', projectId)

  fs.writeFileSync('.dogcli', JSON.stringify({projectId: projectId}))

  console.log(`

Name:           [${name}]
ProjectId:      [${projectId}]
Project Type:   [${projectType}]
API URL:        [https://api-${projectId}.edgeyates.com]
Proxy URL:      [https://${projectId}.edgebayes.com]

`)

  // would you like to grant access to BigQuery to an email associated with a Google account?
  // would you like to point your proxy at an existing backend?
  // would you like to attach a domain with SSL?

  const {answer} = await inquirer.prompt([
    {
      type: 'input',
      name: 'answer',
      message:
        'Would you like to create this app now? (only "yes" will be accepted): '
    }
  ])
}

export default class Deploy extends Command {
  static description = 'friendly wizard for common tasks'

  static examples = ['dog wizard']

  static args = []

  public static flags = {}

  async run() {
    const {args, flags} = this.parse(Deploy)
    const API = apiClient(this)

    this.log()
    this.log(chalk.green('Running DOG CLI Wizard...'))
    this.log()

    const app = 'Create a new app'
    const abTest = 'Run an a/b test on my domain'
    const canary = 'Canary release a new version of my app'

    const {task} = await inquirer.prompt([
      {
        type: 'list',
        name: 'task',
        message: 'What do you want to do?',
        choices: [app, abTest, canary]
      }
    ])

    this.log()

    switch (task) {
      case app:
        const {projectType} = await inquirer.prompt([
          {
            type: 'list',
            name: 'projectType',
            message: 'What type of app?',
            choices: [
              {
                name: 'Full Stack: Proxy, Web App, & CMS',
                value: 'fullStack',
                key: 'f'
              },
              'CMS & API Only',
              'Web App & Proxy',
              'Proxy Only'
            ]
          }
        ])
        await createNewApp(projectType)
        break
      case abTest:
        break
      case canary:
        break
    }
  }
}
