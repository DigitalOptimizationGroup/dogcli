import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class ClientPingLogs extends Command {
  static description = 'front end application pings - filter: --color'

  static flags = {
    color: flags.string({
      char: 'c',
      description: 'filter by backend color (blue)'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(ClientPingLogs)

    streamLogs('clientPing', flags.prettyjson, 'color', flags.color)
  }
}
