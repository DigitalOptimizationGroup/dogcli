import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class VariationInViewportLogs extends Command {
  static description = 'variations entering the viewport'

  static examples = [
    `$ dog logs:variationInViewport
          
# Filter by featureId
$ dog logs:variationInViewport --featureId abc-123
          
# Pretty print JSON
$ dog logs:variationInViewport --prettyjson
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
    const {flags} = this.parse(VariationInViewportLogs)

    streamLogs(
      'variationInViewport',
      flags.prettyjson,
      'featureId',
      flags.featureId
    )
  }
}
