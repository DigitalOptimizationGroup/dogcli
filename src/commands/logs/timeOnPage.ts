import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class TimeOnPageLogs extends Command {
  static description =
    'time on page activity events (event values are not cumulative) - filter: pathname'

  static flags = {
    pathname: flags.string({
      char: 'p',
      description: 'filter by pathname (/pricing)'
    }),
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  async run() {
    const {flags} = this.parse(TimeOnPageLogs)

    streamLogs('timeOnPage', flags.lineType, 'pathname', flags.pathname)
  }
}
