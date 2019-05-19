import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class CaughtErrorLogs extends Command {
  static description =
    'errors your application caught & logged - filter: --color'

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
    const {flags} = this.parse(CaughtErrorLogs)

    streamLogs('caughtError', flags.lineType, 'color', flags.color)
  }
}
