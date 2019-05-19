import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class VariationMousedownLogs extends Command {
  static description = 'mousedown events on variations - filter: --featureId'

  static flags = {
    featureId: flags.string({
      char: 'f',
      description: 'filter by featureId'
    }),
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  async run() {
    const {flags} = this.parse(VariationMousedownLogs)

    streamLogs(
      'variationMousedown',
      flags.lineType,
      'featureId',
      flags.featureId
    )
  }
}
