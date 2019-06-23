import {Command, flags} from '@oclif/command'
import {streamLogs} from '../../stream-logs'

export default class FpsLogs extends Command {
  // maybe it's not fps? but frames over 16ms and longtask timign api
  static description =
    'instances of client side frames per second dropping below 50 fps'

  static examples = [
    `$ dog logs:fps
    
# Filter by backend color
$ dog logs:fps --color blue
    
# Pretty print JSON
$ dog logs:fps --prettyjson
`
  ]

  static flags = {
    color: flags.string({
      char: 'c',
      description: 'filter by backend color (blue)'
    }),
    prettyjson: flags.boolean({
      char: 'p',
      description: 'print pretty JSON'
    })
  }

  async run() {
    const {flags} = this.parse(FpsLogs)

    streamLogs('fps', flags.prettyjson, 'color', flags.color)
  }
}
