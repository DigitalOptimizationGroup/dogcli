import {Command, flags} from '@oclif/command'
import * as Cloudworker from '@dollarshaveclub/cloudworker'
import * as chokidar from 'chokidar'
import {build} from '../build'
import {askForScriptPath} from '../ask-for-script-path'
import {configstore} from '../configstore'
import * as fs from 'fs'

export default class Dev extends Command {
  static description = `run a local server for development`

  public static flags = {
    port: flags.integer({
      char: 'p'
    }),
    // watch: flags.boolean({
    //   char: 'w'
    // }),
    routes: flags.string({
      char: 'r',
      description: 'relative path to your routes.json file'
    }),
    functions: flags.string({
      char: 'f',
      default: 'functions.js'
    }),
    onlyfunctions: flags.boolean({
      char: 'F',
      description: 'only run your functions (faster reloads)'
    })
    // middleware: flags.string({
    //   char: 'm',
    //   default: 'middleware.js'
    // })
  }

  static args = []

  public async run() {
    const {args, flags} = this.parse(Dev)

    var appTypeId: string = configstore.get('appType')

    console.log('Building your app...')

    if (flags.onlyfunctions) {
      throw Error('Implement dev server with only functions')
    }

    var script: string = ''
    if (appTypeId === 'cra') {
      this.log()
      this.log('Building app for deployment...')
      this.log()

      script = await build(
        'build',
        'dev',
        flags.routes || 'routes.json',
        flags.functions
      )
    } else if (appTypeId === 'rawWorker') {
      var scriptPath = configstore.get('scriptPath')
      if (scriptPath === undefined) {
        scriptPath = await askForScriptPath()
      }
      this.log()

      script = fs.readFileSync(scriptPath, 'utf8')
    } else if (appTypeId === 'awsLambdaGateway') {
      this.log(`
Lambda dev not yet supported
`)
      process.exit()
    } else {
      this.log(
        "Either your AppType is not set or it's undefined. Trying running dog apps:init."
      )
      process.exit()
    }

    const port = flags.port || 3000
    let server = new Cloudworker(script, {debug: true}).listen(port)
    console.log(`Listening on ${port}`)

    let stopping = false
    let reloading = false

    // maybe we'd like to also watch adding files
    // if (flags.watch) {
    //   chokidar.watch(['dist/worker.js']).on('change', (event, path) => {
    //     reloading = true
    //     console.log('Changes to build folder detected - reloading...')

    //     server.close(async () => {
    //       if (stopping) return

    //       reloading = false

    //       const newScript = fs.readFileSync('./dist/worker.js', 'utf8')

    //       console.log('Successfully reloaded!')

    //       server = new Cloudworker(newScript).listen(port)
    //     })
    //   })
    //   // chokidar
    //   //   .watch([
    //   //     'build',
    //   //     ...(flags.functions ? [flags.functions] : []),
    //   //     ...(flags.routes ? [flags.routes] : [])
    //   //   ])
    //   //   .on('change', (event, path) => {
    //   //     reloading = true
    //   //     console.log('Changes to build folder detected - reloading...')

    //   //     server.close(async () => {
    //   //       if (stopping) return

    //   //       reloading = false

    //   //       const newScript = await build(
    //   //         'build',
    //   //         'dev',
    //   //         flags.routes || 'routes.json',
    //   //         flags.functions
    //   //       )

    //   //       console.log('Successfully reloaded!')

    //   //       server = new Cloudworker(newScript).listen(port)
    //   //     })
    //   //   })
    // }

    function shutdown() {
      if (stopping) return

      stopping = true
      console.log('\nShutting down...')
      server.close(terminate)

      if (reloading) server.on('close', terminate)
    }

    function terminate() {
      console.log('Goodbye!')
      process.exit(0)
    }

    process.on('SIGINT', () => {
      shutdown()
    })

    process.on('SIGTERM', () => {
      shutdown()
    })
  }
}
