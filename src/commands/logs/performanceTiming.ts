import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class PerformanceTimingLogs extends Command {
  static description =
    'application performance from the navigation timing api including timeToFirstByte, FCP, & TTI'

  static examples = [
    `$ dog logs:performanceTiming
          
# Filter by property
${[
  'timeToFetchStart',
  'dnsLookupTime',
  'timeToFistByte',
  'timeToHtmlPage',
  'domInteractive',
  'pageLoadTime',
  'firstContentfulPaint',
  'firstPaint',
  'firstInputDelay',
  'tti'
]
  .map(
    property => `$ dog logs:performanceTiming --property ${property}
`
  )
  .join('')}

# Pretty print JSON
$ dog logs:performanceTiming --prettyjson
`
  ]

  static flags = {
    property: flags.string({
      char: 't',
      description: 'filter by performance timing property'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  async run() {
    const {flags} = this.parse(PerformanceTimingLogs)

    streamLogs(
      'performanceTiming',
      flags.prettyjson,
      'property',
      flags.property
    )
  }
}
