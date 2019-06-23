import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class ClientPingLogs extends Command {
  static description = 'front end application pings'

  static examples = [
    `$ dog logs:clientPing

# Filter by backend color
$ dog logs:clientPing --color blue

# Pretty print JSON
$ dog logs:clientPing --prettyjson
`
  ]

  static flags = {
    color: flags.string({
      char: 'c',
      description: 'filter by backend color'
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
