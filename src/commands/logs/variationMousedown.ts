import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class VariationMousedownLogs extends Command {
  static description = 'mousedown events on variations'

  static examples = [
    `$ dog logs:variationMousedown
          
# Filter by featureId
$ dog logs:variationMousedown --featureId abc-123
          
# Pretty print JSON
$ dog logs:variationMousedown --prettyjson
`
  ]

  static flags = {
    featureId: flags.string({
      char: 'f',
      description: 'filter by featureId'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  async run() {
    const {flags} = this.parse(VariationMousedownLogs)

    streamLogs(
      'variationMousedown',
      flags.prettyjson,
      'featureId',
      flags.featureId
    )
  }
}
