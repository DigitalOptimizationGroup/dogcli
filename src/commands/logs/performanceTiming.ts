import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class PerformanceTimingLogs extends Command {
  static description =
    'application performance from the navigation timing api including timeToFirstByte, FCP, & TTI - filter: --property'

  static flags = {
    property: flags.string({
      char: 'p',
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
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  async run() {
    const {flags} = this.parse(PerformanceTimingLogs)

    streamLogs('performanceTiming', flags.lineType, 'property', flags.property)
  }
}
