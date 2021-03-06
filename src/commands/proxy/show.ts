/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {getProjectId} from '../../get-project-id'
import {apiClient, processResponse} from '../../api'
import {configstore} from '../../configstore'

export default class Show extends Command {
  static description = 'show current local & deployed proxy configs'

  static flags = {}

  static args = []

  async run() {
    const API = apiClient(this)
    const {flags} = this.parse(Show)
    const projectId = getProjectId()

    const {config, urls}: {config: any; urls: Array<string>} = await API.post(
      `/api/v1/refresh-proxy`,
      '',
      {
        params: {
          projectId
        }
      }
    )
      .then(response => {
        if (response.data.error) {
          this.log(response.data.error)
          process.exit()
        }
        return response.data
      })
      .catch(err => {
        this.log('Failed to update config from production, please rerun.')
        process.exit()
      })

    // var formattedConfig = ''

    // if (config.mode === 'productionBackend') {
    //   formattedConfig = `backend:  [${config.productionBackend}]`
    // } else if (config.mode === 'abtest') {
    //   formattedConfig = ``
    // } else if (config.mode === 'canary') {
    //   formattedConfig = ``
    // }

    this.log(`
Current proxy configurations:

project:  [${projectId}]
${urls.map(url => `target domain:   [${url}]`).join('\n')}

production config:
${JSON.stringify(config, null, 4)}

local config:
${JSON.stringify(configstore.get('proxyConfig'), null, 4)}

`)
  }
}
