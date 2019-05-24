import {apiClient, processResponse} from '../api'
import {createHash} from 'crypto'
import {AxiosResponse} from 'axios'
import {Command, flags} from '@oclif/command'
import {build} from '../build'
import {configstore} from '../configstore'
import {cli} from 'cli-ux'

export default class Deploy extends Command {
  static description = 'deploy your application'

  static examples = [
    'dog deploy blue',
    'dog deploy blue --force',
    'dog deploy green --path /build'
  ]

  static args = [
    {
      name: 'color',
      description: 'the backend color to deploy to',
      required: true,
      options: ['blue', 'green']
    },
    {
      name: 'path',
      description: 'path to root folder',
      default: process.cwd()
    }
  ]

  public static flags = {
    force: flags.boolean(),
    // functions: flags.boolean({
    //   char: 'f'
    // }),
    // functionsPath: flags.string(),
    // staticPath: flags.string()
    routes: flags.string({
      char: 'r',
      description: 'relative path to your routes.json file'
    }),
    functions: flags.string({
      char: 'f',
      default: 'functions.js'
    })
  }

  // get project-id from .yaml config

  async run() {
    const {args, flags} = this.parse(Deploy)
    const API = apiClient(this)
    const projectId = configstore.get('projectId')

    this.log('Building app for deployment...')
    this.log()
    const script = await build(
      'build',
      args.color,
      flags.routes || 'routes.json',
      flags.functions
    )

    const bundleHash = createHash('sha1') // we need to verify the upload is :+1:
    bundleHash.update(script)
    const bundleDigest = bundleHash.digest('hex')

    this.log(`Services to deploy:

build folder:    [${args.path}/build]
target project:  [${projectId}]
target color:    [${args.color}]
bundle hash:     [${bundleDigest}]
force flag:      [${flags.force ? true : false}]
`)

    this.log()
    const response = await cli.prompt(
      "Enter 'yes' to deploy (only 'yes' will be accepted)"
    )

    if (response === 'yes') {
      const res = await new Promise<AxiosResponse<any>>((resolve, reject) => {
        API.post(`/api/v1/apps`, script, {
          params: {
            sha1: bundleDigest,
            color: args.color,
            projectId,
            force: flags.force
          },
          headers: {
            'Content-Type': 'text/plain'
            // 'Content-Length': gz.byteLength,
            // 'Content-Encoding': 'gzip'
          },
          maxContentLength: 100 * 1024 * 1024,
          timeout: 120 * 1000
        })
          .then(resolve)
          .catch(reject)
      })

      processResponse(this, res, () => {
        this.log(`Successfully deployed to your: ${args.color} backend`)
      })
    } else {
      this.log('Exiting without deploying...')
    }
  }
}
