import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class LongTasksTimingLongs extends Command {
  // maybe it's not fps? but frames over 16ms and longtask timign api
  static description =
    'instances of client side tasks that exceed 50ms using the browsers Long Tasks API'

  static examples = [
    `$ dog logs:longTasksTiming
      
# Filter by backend color
$ dog logs:longTasksTiming --color blue

# Pretty print JSON
$ dog logs:longTasksTiming --prettyjson
`
  ]

  static flags = {
    color: flags.string({
      char: 'c',
      description: 'filter by backend color (blue)'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  async run() {
    const {flags} = this.parse(LongTasksTimingLongs)

    streamLogs('longTasksTiming', flags.prettyjson, 'color', flags.color)
  }
}
