import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class ErrorLogs extends Command {
  static description =
    'errors caught globally from window.onerror - filter: --color'

  static flags = {
    color: flags.string({
      char: 'c',
      description: 'filter by backend color (blue)'
    }),
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  static args = []

  async run() {
    const {flags} = this.parse(ErrorLogs)

    streamLogs('error', flags.lineType, 'color', flags.color)
  }
}
