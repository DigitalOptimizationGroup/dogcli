import {Command} from '@oclif/command'
import {apiClient} from '../../api'
import {configstore} from '../../configstore'

export default class CheckDomainStatus extends Command {
  static description = 'list all custom hostnames associated with your app'

  static flags = {}

  static args = []

  async run() {
    const API = apiClient(this)
    const {args} = this.parse(CheckDomainStatus)

    const projectId = configstore.get('projectId')

    this.log(`
THIS COMMAND IS UNDER DEVELOPMENT   
`)

    // const status = await API.post(
    //   `/api/v1/list-domains`,
    //   {},
    //   {
    //     params: {
    //       projectId
    //     }
    //   }
    // )
    //   .then(response => {
    //     if (response.data.error) {
    //       this.log(response.data.error)
    //       process.exit()
    //     }
    //     return response.data
    //   })
    //   .catch(err => {
    //     this.log('Failed to get domain information, please rerun.')
    //     process.exit()
    //   })
  }
}
