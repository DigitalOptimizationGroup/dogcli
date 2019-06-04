import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class OrientationChangeLogs extends Command {
  static description = 'orientation changes in your application - filter: --rid'

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
    const {flags} = this.parse(OrientationChangeLogs)

    streamLogs('orientationChange', flags.prettyjson, 'rid', flags.rid)
  }
}
