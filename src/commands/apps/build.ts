import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
import * as fs from 'fs'
const path = require('path')
import {createHash} from 'crypto'

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

    const npmTemplate = configstore.get('npmTemplate')

    if (npmTemplate === undefined) {
      this.log()
      this.log('App not initialized properly. Run dog apps:init')
      this.log()
      process.exit()
    }

    const moduleInstalled = fs.existsSync(
      path.join(process.cwd(), 'node_modules', npmTemplate)
    )

    if (!moduleInstalled) {
      this.log(`Template module not found. Please install ${npmTemplate}`)
      this.log()
      process.exit()
    }

    const {build} = require(path.join(
      process.cwd(),
      'node_modules',
      npmTemplate,
      'lib/build'
    ))

    const script = await build() // should we pass the config in here? then a flag could give it a different path?

    const bundleHash = createHash('sha1')
    bundleHash.update(script)
    const bundleDigest = bundleHash.digest('hex')

    configstore.set('bundleDigest', bundleDigest)

    if (!fs.existsSync('.dog')) {
      fs.mkdirSync(path.resolve('.dog'))
    }

    fs.writeFileSync('./.dog/index.js', script)

    this.log(`
Build complete. Run the following command to deploy:

dog apps:apply COLOR

Examples:
dog apps:apply blue
dog apps:apply blue --force
`)
  }
}
