import {apiClient} from '../../api'
import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')
import * as inquirer from 'inquirer'

export default class NewApp extends Command {
  static description = 'create a new application'

  static examples = ['dog apps:new']

  static args = []

  public static flags = {}

  async run() {
    const {args, flags} = this.parse(NewApp)
    const API = apiClient(this)
    this.log('Creating new project...')
    this.log()

    const templates = await API.post(`/api/v1/available-templates`)
      .then(response => {
        return response.data
      })
      .catch(err => {
        console.log('err', err)
      })

    const answer: {script: string; cms: string} = await inquirer.prompt([
      {
        type: 'list',
        name: 'script',
        message: 'Select an App type:',
        choices: templates.appTypes
      },
      {
        type: 'list',
        name: 'cms',
        message: 'Select a CMS template:',
        choices: templates.cmsTemplates
      }
    ])
    const appTypeId: string = templates.appTypes.find(
      (app: {name: string}) => app.name === answer.script
    ).id
    const cmsTemplateId: string = templates.cmsTemplates.find(
      (cms: {name: string}) => cms.name === answer.cms
    ).id

    const intervalId = setInterval(() => {
      this.log('Creating new project...')
    }, 3000)
    const appInfo = await API.post('/api/v1/create-new-project', '', {
      params: {
        cmsTemplateName: cmsTemplateId,
        appTypeId
      }
    })
      .then(response => {
        clearInterval(intervalId)
        if (response.data.error) {
          this.log(response.data.error)
          process.exit()
        }
        if (response.status === 402) {
          this.log()
          this.log(logSymbols.error, response.data.message)
          this.log()
          process.exit()
        }
        return response.data
      })
      .catch(err => {
        // logToUs(err) - nodeJsDogLogger
        clearInterval(intervalId)
        this.log('Failed, please try again or contact us.')
        process.exit()
      })

    configstore.set('projectId', appInfo.projectId)
    configstore.set('colors', appInfo.colors)
    configstore.set('proxyConfig', appInfo.proxyConfig)
    configstore.set('appType', appTypeId)

    this.log(`
App created and directory initialized:

App Id:         [${appInfo.projectId}]
App Type:       [${answer.script}]
CMS Template:   [${answer.cms}]
App Url:        [${appInfo.appUrl}]
CMS API Url:    [${appInfo.apiUrl}]
`)
  }
}
