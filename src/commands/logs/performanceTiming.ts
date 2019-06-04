import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class PerformanceTimingLogs extends Command {
  static description =
    'application performance from the navigation timing api including timeToFirstByte, FCP, & TTI - filter: --property'

  static flags = {
    property: flags.string({
      char: 't',
      description:
        'filter by performance timing property: \n' +
        [
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
        ].join('\n')
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
