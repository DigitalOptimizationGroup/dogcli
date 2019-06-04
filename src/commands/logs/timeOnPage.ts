import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class TimeOnPageLogs extends Command {
  static description =
    'time on page activity events (event values are not cumulative) - filter: pathname'

  static flags = {
    pathname: flags.string({
      char: 'n',
      description: 'filter by pathname (/pricing)'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  async run() {
    const {flags} = this.parse(TimeOnPageLogs)

    streamLogs('timeOnPage', flags.prettyjson, 'pathname', flags.pathname)
  }
}
