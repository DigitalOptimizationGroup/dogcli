import {apiClient, processResponse} from '../../api'
import {createHash} from 'crypto'
import {AxiosResponse} from 'axios'
import {Command, flags} from '@oclif/command'
import {build} from '../../build'
import {cli, config} from 'cli-ux'
import {getProjectId} from '../../get-project-id'
import {configstore} from '../../configstore'
import * as inquirer from 'inquirer'
import * as fs from 'fs'
import {askForScriptPath} from '../../ask-for-script-path'

export default class ApplyApp extends Command {
  static description = 'deploy your application to a chosen color'

  static examples = [
    'dog deploy blue',
    'dog deploy blue --force',
    'dog deploy green --path ./custom/script.js'
  ]

  static args = [
    {
      name: 'color',
      description: 'the backend color to deploy to',
      required: true,
      // options wants to be dynamic - pull from config?
      options: ['blue', 'green']
    }
  ]

  public static flags = {
    force: flags.boolean(),
    path: flags.string({
      char: 'p'
    })
  }

  async run() {
    const {args, flags} = this.parse(ApplyApp)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log('Preparing for deployment...')
    this.log()

    var appTypeId: string = configstore.get('appType')

    var script: string = ''
    var scriptPath: string = './.dog/index.js'
    if (appTypeId === 'rawWorker') {
      if (flags.path !== undefined) {
        scriptPath = flags.path
        script = fs.readFileSync(flags.path, 'utf8')
      } else if (configstore.get('scriptPath')) {
        scriptPath = configstore.get('scriptPath')
        script = fs.readFileSync(configstore.get('scriptPath'), 'utf8')
      } else {
        scriptPath = await askForScriptPath()
        this.log()
        script = fs.readFileSync(scriptPath, 'utf8')
      }
    } else {
      script = fs.readFileSync(scriptPath, 'utf8')
    }

    this.log(`
App to deploy:

app type:        [${appTypeId}]
script path:     [${scriptPath}]
target project:  [${projectId}]
target color:    [${args.color}]
force flag:      [${flags.force ? true : false}]
`)

    const bundleHash = createHash('sha1')
    bundleHash.update(script)
    const bundleDigest = bundleHash.digest('hex')

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
