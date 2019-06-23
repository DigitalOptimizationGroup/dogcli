import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class AssetLoadTime extends Command {
  static description = 'live js & css asset performance'
  static examples = [
    `$ dog logs:assetLoadTime
{"asset":"https://example.com/build/main.js","color":"green","duration":85,"protocol":"h2","rid":"abc-567","vid":"abc-123"}

# Filter by asset
$ dog logs:assetLoadTime --asset https://example.com/build/main.js

# Pretty print JSON
$ dog logs:assetLoadTime --prettyjson
{
  "asset": "https://example.com/build/main.js",
  "color": "green",
  "duration": 85,
  "protocol": "h2",
  "rid": "abc-567",
  "vid": "abc-123"
}
`
  ]

  static flags = {
    asset: flags.string({
      char: 'a',
      description: 'filter by fqdn of asset (https://example.com/build/main.js)'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  static args = []

  async run() {
    const {flags} = this.parse(AssetLoadTime)

    streamLogs('assetLoadTime', flags.prettyjson, 'asset', flags.asset)
  }
}
