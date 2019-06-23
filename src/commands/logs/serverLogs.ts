import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class ServerLogs extends Command {
  static description = 'server logs'

  static examples = [
    `$ dog logs:serverLogs
          
# Filter by color
$ dog logs:serverLogs --color green
          
# Pretty print JSON
$ dog logs:serverLogs --prettyjson
`
  ]

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

  async run() {
    const {flags} = this.parse(ServerLogs)

    streamLogs('serverLogs', flags.prettyjson, 'color', flags.color)
  }
}
