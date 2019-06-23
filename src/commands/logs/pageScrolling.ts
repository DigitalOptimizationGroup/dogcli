import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class PageScrollingLogs extends Command {
  static description = 'scrolling activity from your application'

  static examples = [
    `$ dog logs:pageScrolling
        
# Filter by pathname
$ dog logs:pageScrolling --pathname /about-us
        
# Pretty print JSON
$ dog logs:pageScrolling --prettyjson
  `
  ]

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
    const {flags} = this.parse(PageScrollingLogs)

    streamLogs('pageScrolling', flags.prettyjson, 'pathname', flags.pathname)
  }
}
