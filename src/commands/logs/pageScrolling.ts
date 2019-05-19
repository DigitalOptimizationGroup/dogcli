import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class PageScrollingLogs extends Command {
  static description =
    'scrolling activity from your application - filter: --pathname'

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
    const {flags} = this.parse(PageScrollingLogs)

    streamLogs('pageScrolling', flags.lineType, 'pathname', flags.pathname)
  }
}
