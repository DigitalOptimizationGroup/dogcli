import {Command} from '@oclif/command'
import {configstore} from '../../configstore'

export default class Show extends Command {
  static description = 'show your local proxy config'

  static flags = {}

  static args = []

  async run() {
    const {flags} = this.parse(Show)

    console.log()
    console.log(JSON.stringify(configstore.get('proxyConfig'), null, 4))
    console.log()
  }
}
