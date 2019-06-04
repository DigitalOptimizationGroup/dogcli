import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class PageViewLogs extends Command {
  static description = 'page views in realtime - filter: --pathname'

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

  static args = []

  async run() {
    const {flags} = this.parse(PageViewLogs)

    streamLogs('pageView', flags.prettyjson, 'pathname', flags.pathname)
  }
}
