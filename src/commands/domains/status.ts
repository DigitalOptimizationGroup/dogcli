import {Command} from '@oclif/command'
import {apiClient} from '../../api'
import {configstore} from '../../configstore'
import {CUSTOM_DOMAINS_CNAME} from '../../cli-config'

export default class CheckDomainStatus extends Command {
  static description = 'check the status of a custom hostname'

  static examples = [
    `$ dog domains:status www.example.com
`
  ]

  static flags = {}

  static args = [{name: 'hostname', required: true}]

  async run() {
    const API = apiClient(this)
    const {args} = this.parse(CheckDomainStatus)

    const projectId = configstore.get('projectId')

    const status = await API.post(
      `/api/v1/check-domain-status`,
      {hostname: args.hostname},
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
        this.log('Failed to get domain information, please rerun.')
        process.exit()
      })

    if (status.status === 'pending_validation' && status.method === 'cname') {
      this.log(`
To complete validation of your domain create a CNAME pointing:

${status.cname}        
to
${CUSTOM_DOMAINS_CNAME}

Once that has validated (check by running this command again), you will also need to set up your final CNAME:

${args.hostname}
to
${CUSTOM_DOMAINS_CNAME}

`)
    } else if (
      status.status === 'pending_validation' &&
      status.method === 'email'
    ) {
      this.log(`
To complete validation of your domain check one of the following emails. You should find a validation email from Cloudflare (our SSL provider), follow the instructions:

${status.emails.join('\n')}

Once validated (check by running this command again), you will also need to set up your final CNAME:

${args.hostname}
to
${CUSTOM_DOMAINS_CNAME}

`)
    } else if (
      status.status === 'pending_validation' &&
      status.method === 'http'
    ) {
      this.log(`
To complete validation of your domain you can simply point a CNAME from:

${args.hostname}
to
${CUSTOM_DOMAINS_CNAME}

Alternatively you may serve a text record from your current site. You will need to return the following .txt file:
${status.http_url}
with the contents:

${status.http_body}
      `)
    } else if (status) {
      this.log()
      this.log(JSON.stringify(status, null, 4))
      this.log()
    } else {
      this.log()
      this.log(
        'Failed to get domain information, please rerun or contact support.'
      )
      this.log()
    }
  }
}
