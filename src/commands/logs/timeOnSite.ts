import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class TimeOnSiteLogs extends Command {
  static description =
    'time on site activity events (event values are not cumulative)'

  static examples = [
    `$ dog logs:timeOnSite
              
# Filter by visibility
$ dog logs:timeOnSite --visibility hidden
              
# Pretty print JSON
$ dog logs:timeOnSite --prettyjson
`
  ]

  static flags = {
    visibility: flags.string({
      char: 'v',
      description: 'filter by visibility (hidden)'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  async run() {
    const {flags} = this.parse(TimeOnSiteLogs)

    streamLogs('timeOnSite', flags.prettyjson, 'visibility', flags.visibility)
  }
}
