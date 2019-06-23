import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class ErrorLogs extends Command {
  static description = 'errors caught globally from window.onerror'

  static examples = [
    `$ dog logs:error
  
# Filter by backend color
$ dog logs:error --color blue
  
# Pretty print JSON
$ dog logs:error --prettyjson
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

  static args = []

  async run() {
    const {flags} = this.parse(ErrorLogs)

    streamLogs('error', flags.prettyjson, 'color', flags.color)
  }
}
