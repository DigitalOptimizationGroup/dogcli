import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class RapidClickingLogs extends Command {
  static description = 'incidences of "rapid/rage clicking" in your application'

  static examples = [
    `$ dog logs:rapidClicking

# Pretty print JSON
$ dog logs:rapidClicking --prettyjson
`
  ]

  static flags = {
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  async run() {
    const {flags} = this.parse(RapidClickingLogs)

    streamLogs('rapidClicking', flags.prettyjson)
  }
}
