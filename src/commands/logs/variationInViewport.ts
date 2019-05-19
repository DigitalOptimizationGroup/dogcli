import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class VariationInViewportLogs extends Command {
  static description = 'variations entering the viewport - filter: --featureId'

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
    const {flags} = this.parse(VariationInViewportLogs)

    streamLogs(
      'variationInViewport',
      flags.lineType,
      'featureId',
      flags.featureId
    )
  }
}
