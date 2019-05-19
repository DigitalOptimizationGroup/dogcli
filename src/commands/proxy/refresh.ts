import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')
import {apiClient} from '../../api'

export default class Show extends Command {
  static description = 'refresh your local config from production environment'

  static flags = {}

  static args = []

  async run() {
    const projectId = configstore.get('projectId')
    const API = apiClient(this)

    await API.post(`/api/v1/refresh-proxy`, '', {
      params: {
        projectId
      }
    })
      .then(response => {
        if (response.data.error) {
          this.log(response.data.error)
          process.exit()
        }
        configstore.set('proxyConfig', response.data)
        this.log()
        this.log(
          logSymbols.success,
          'Successfully refreshed and updated local proxy config from production.'
        )
        this.log()
      })
      .catch(err => {
        this.log('err', err)
      })

    this.log()
    this.log(JSON.stringify(configstore.get('proxyConfig'), null, 4))
    this.log()
  }
}
