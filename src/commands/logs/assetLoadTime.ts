import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class AssetLoadTime extends Command {
  static description = 'live js & css asset performance - filter: --asset'

  static flags = {
    asset: flags.string({
      char: 'a',
      description:
        'filter by fqdn of asset (https://example.com/static/abc123.js)'
    }),
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  static args = []

  async run() {
    const {flags} = this.parse(AssetLoadTime)

    streamLogs('assetLoadTime', flags.lineType, 'asset', flags.asset)
  }
}
