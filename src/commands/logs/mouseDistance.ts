import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class MouseDistanceLogs extends Command {
  static description =
    'euclidean mouse distance, over 3 second intervals, from your applications'

  static examples = [
    `$ dog logs:mouseDistance
      
# Filter by a single request Id
$ dog logs:mouseDistance --rid abc-123
      
# Pretty print JSON
$ dog logs:mouseDistance --prettyjson
`
  ]

  static flags = {
    rid: flags.string({
      char: 'r',
      description: 'filter by a single rid (get it from server or proxy logs)'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(MouseDistanceLogs)

    streamLogs('mouseDistance', flags.prettyjson, 'rid', flags.rid)
  }
}
