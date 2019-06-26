import {Command, flags} from '@oclif/command'
import {apiClient} from '../../api'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')
import {getProjectId} from '../../get-project-id'

import {CUSTOM_DOMAINS_CNAME} from '../../cli-config'

export default class AddDomain extends Command {
  static description = 'attach a CNAME to your application'

  static examples = [
    `$ dog domains:add www.example.com

# Validate your domain automatically (default)
$ dog domains:add www.example.com --validation http

# Validate your domain by placing an extra CNAME with auth code
$ dog domains:add www.example.com --validation cname

# Validate your domain by receiving an email sent to your WHOIS contacts
$ dog domains:add www.example.com --validation email
`
  ]

  static flags = {
    validation: flags.string({
      char: 'v',
      options: ['http', 'email', 'cname'],
      default: 'http',
      description:
        'specify the validation method - http happens inline, email will send to the WHOIS contacts, cname will return a record that needs to be placed'
    })
  }

  static args = [{name: 'hostname', required: true}]

  async run() {
    const API = apiClient(this)
    const {args, flags} = this.parse(AddDomain)

    const projectId = getProjectId()

    await API.post(
      `/api/v1/custom-domain`,
      {hostname: args.hostname, method: flags.validation},
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
        if (response.status === 402) {
          this.log()
          this.log(logSymbols.error, response.data.message)
          this.log()
          process.exit()
        }
        return response.data
      })
      .catch(err => {
        this.log('Failed, please rerun.')
        process.exit()
      })

    let message: string

    // HTTP
    if (flags.validation === 'http') {
      message = `Success. Your custom hostname, ${
        args.hostname
      }, has been created. 

If you have not already pointed a CNAME at ${CUSTOM_DOMAINS_CNAME} you should do so now. If you have, your domain should start working shortly.
`
    }
    // CNAME
    else if (flags.validation === 'cname') {
      message = `Success. Your custom hostname, ${
        args.hostname
      }, has been created. 
      
You will need to set up a CNAME for validation as well as a CNAME pointing ${
        args.hostname
      } at ${CUSTOM_DOMAINS_CNAME}. When ready, the following command will return CNAME needed for validation (should be ready in a few seconds):

dog domains:status ${args.hostname}

`
    }
    // EMAIL
    else {
      message = `Success. Your custom hostname, ${
        args.hostname
      }, has been created. 
      
You requested email validation. Please check the emails associated with your WHOIS records. Once you have validated your domain you will also need to create a CNAME pointing ${
        args.hostname
      } at ${CUSTOM_DOMAINS_CNAME}. You can run the following command to check your validation status:

dog domains:status ${args.hostname}

`
    }

    this.log()
    this.log(logSymbols.success, message)
  }
}
