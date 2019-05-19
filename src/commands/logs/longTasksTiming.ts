import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class LongTasksTimingLongs extends Command {
  // maybe it's not fps? but frames over 16ms and longtask timign api
  static description =
    'instances of client side tasks that exceed 50ms using the browsers Long Tasks API - filter: --color'

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

  async run() {
    const {flags} = this.parse(LongTasksTimingLongs)

    streamLogs('longTasksTiming', flags.lineType, 'color', flags.color)
  }
}
