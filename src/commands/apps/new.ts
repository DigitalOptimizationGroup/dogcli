import {apiClient} from '../../api'
import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')
import * as inquirer from 'inquirer'

export default class NewApp extends Command {
  static description = 'create a new application'

  static args = [
    {
      name: 'friendlyName',
      description:
        'a friendly display name for your project. the id will be created from this.',
      required: true
    }
  ]

  public static flags = {}

  async run() {
    const {args, flags} = this.parse(NewApp)
    const API = apiClient(this)

    this.log('Creating new project...')
    this.log()

    const intervalId = setInterval(() => {
      this.log('Creating new project...')
    }, 3000)
    const appInfo = await API.post('/api/v1/create-new-project', '', {
      params: {
        friendlyName: args.friendlyName
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

    this.log(`
  App Id:         [${appInfo.projectId}]
  `)

    // init now?
  }
}
