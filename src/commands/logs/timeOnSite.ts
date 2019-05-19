import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class TimeOnSiteLogs extends Command {
  static description =
    'time on site activity events (event values are not cumulative) - filter: visibility'

  static flags = {
    visibility: flags.string({
      char: 'v',
      description: 'filter by visibility (hidden)'
    }),
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  async run() {
    const {flags} = this.parse(TimeOnSiteLogs)

    streamLogs('timeOnSite', flags.lineType, 'visibility', flags.visibility)
  }
}
