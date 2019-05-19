import {Command, flags} from '@oclif/command'
import {apiClient, processResponse} from '../../api'
import {configstore} from '../../configstore'
import {AxiosResponse} from 'axios'
import * as diff from 'json-diff'
import {cli} from 'cli-ux'

export default class Apply extends Command {
  static description = 'update your production proxy'

  static flags = {
    force: flags.boolean({char: 'f'})
  }

  static args = []

  async run() {
    const API = apiClient(this)
    const {flags} = this.parse(Apply)

    const projectId = configstore.get('projectId')

    // check if proxy has a config file in the project
    const proxyConfig = configstore.get('proxyConfig')
    if (proxyConfig === undefined) {
      this.log(
        'You must at least set a default backend to deploy the proxy. Run `dog proxy:config --default blue` and try again.'
      )
    }
    this.log()
    this.log('Preparing to update proxy...')
    this.log()

    const currentDeployedProxyConfig = await API.post(
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

    const domains = [
      `https://${projectId}.edgebayes.com`,
      'https://test.abtrack.io'
    ]

    this.log(`Project & domain(s) this will apply to:

target project:  [${projectId}]
${domains.map(domain => `target domain:   [${domain}]`).join('\n')}
`)

    this.log(
      'Deploying will make the following changes to your production proxy config: '
    )
    this.log()
    this.log(
      diff.diffString(
        currentDeployedProxyConfig,
        configstore.get('proxyConfig')
      )
    )
    this.log()

    const response = await cli.prompt(
      "Enter 'yes' to deploy (only 'yes' will be accepted)"
    )

    if (response === 'yes') {
      const res = await new Promise<AxiosResponse<any>>((resolve, reject) => {
        API.post(`/api/v1/proxy`, JSON.stringify(proxyConfig), {
          params: {
            projectId,
            force: flags.force
          },
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(resolve)
          .catch(reject)
      })

      processResponse(this, res, () => {
        // this should come from the config and if there is a domain it should show that?
        this.log(
          `Successfully updated proxy at: https://${projectId}.edgebayes.com`
        )
      })
    } else {
      this.log('Exiting without applying...')
    }
  }
}
