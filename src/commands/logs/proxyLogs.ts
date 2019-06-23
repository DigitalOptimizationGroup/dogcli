import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class ProxyLogs extends Command {
  static description = 'proxy logs'

  static examples = [
    `$ dog logs:proxyLogs
          
# Filter by country
$ dog logs:proxyLogs --country US
          
# Pretty print JSON
$ dog logs:proxyLogs --prettyjson
`
  ]

  static flags = {
    country: flags.string({
      char: 'c',
      description: 'filter proxy logs by a single country code (such as US)'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  static args = []

  async run() {
    const {flags} = this.parse(ProxyLogs)

    streamLogs('proxyLogs', flags.prettyjson, 'country', flags.country)
  }
}
