import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class ProxyLogs extends Command {
  static description = 'proxy logs - filter: --country'

  static flags = {
    country: flags.string({
      char: 'c',
      description: 'filter proxy logs by a single country code (such as US)'
    }),
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  static args = []

  async run() {
    const {flags} = this.parse(ProxyLogs)

    streamLogs('proxyLogs', flags.lineType, 'country', flags.country)
  }
}
