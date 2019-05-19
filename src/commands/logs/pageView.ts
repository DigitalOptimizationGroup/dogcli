import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class PageViewLogs extends Command {
  static description = 'page views in realtime - filter: --pathname'

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

  static args = []

  async run() {
    const {flags} = this.parse(PageViewLogs)

    streamLogs('pageView', flags.lineType, 'pathname', flags.pathname)
  }
}
