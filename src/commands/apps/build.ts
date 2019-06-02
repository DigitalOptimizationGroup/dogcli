import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
import * as fs from 'fs'

export default class BuildApp extends Command {
  static description = 'build your application from a template script'

  static examples = []

  static args = []

  public static flags = {}

  async run() {
    const {args, flags} = this.parse(BuildApp)

    var appTypeId: string = configstore.get('appType')

    if (appTypeId === undefined) {
      this.log()
      this.log('App not initialized. Run dog apps:init')
      this.log()
      process.exit()
    }

    if (appTypeId === 'rawScript') {
      this.log()
      this.log('App configured to use a raw script, nothing to build. Exiting.')
      this.log()
      process.exit()
    }

    this.log()
    this.log('Building app for deployment...')
    this.log()

    const templatePackage = configstore.get('templatePackageName')
    const {build} = require(`${templatePackage}/build`)
    const script = await build() // should we pass the config in here? then a flag could give it a different path?

    fs.writeFileSync('./dist/dog-script.js', script)

    this.log(`
Build complete. Run the following command to deploy:

dog apps:apply COLOR
`)
  }
}
