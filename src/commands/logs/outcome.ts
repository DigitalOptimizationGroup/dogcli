import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class OutcomeLogs extends Command {
  static description =
    'custom implemented outcomes from your application - filter: --outcome'

  static flags = {
    outcome: flags.string({
      char: 'o',
      description: 'filter by outcome (addToCart)'
    }),
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  async run() {
    const {flags} = this.parse(OutcomeLogs)

    streamLogs('outcome', flags.lineType, 'outcome', flags.outcome)
  }
}
