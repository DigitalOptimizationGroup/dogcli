import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class RapidClickingLogs extends Command {
  static description = 'incidences of "rapid/rage clicking" in your application'

  static flags = {
    lineType: flags.string({
      char: 'l',
      description: 'line type',
      options: ['prettyjson', 'json']
    })
  }

  async run() {
    const {flags} = this.parse(RapidClickingLogs)

    streamLogs('rapidClicking', flags.lineType)
  }
}
