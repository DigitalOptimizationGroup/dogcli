import {apiClient, processResponse} from '../api'
import {createHash} from 'crypto'
import {AxiosResponse} from 'axios'
import {Command, flags} from '@oclif/command'
import {build} from '../build'
import {cli, config} from 'cli-ux'
import {getProjectId} from '../get-project-id'
import {configstore} from '../configstore'
import * as inquirer from 'inquirer'
import * as fs from 'fs'

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
      // options wants to be dynamic - pull from config?
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
    }),
    selectAppType: flags.boolean({
      char: 'a',
      description:
        'Overwrite your default app type for this deploy only (rerun init if you want to change default)'
    })
  }

  // get project-id from .yaml config

  async run() {
    const {args, flags} = this.parse(Deploy)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log('Preparing for deployment...')
    this.log()

    var appTypeId: string = configstore.get('appType')

    if (flags.selectAppType) {
      const templates = await API.post(`/api/v1/available-templates`)
        .then(response => {
          return response.data
        })
        .catch(err => {
          console.log('err', err)
        })
      const answer: {script: string} = await inquirer.prompt([
        {
          type: 'list',
          name: 'script',
          message: 'Select App type for this deploy:',
          choices: templates.appTypes
        }
      ])
      appTypeId = templates.appTypes.find(
        (app: {name: string}) => app.name === answer.script
      ).id
    }

    var script: string = ''
    if (appTypeId === 'cra') {
      this.log()
      this.log('Building app for deployment...')
      this.log()

      script = await build(
        'build',
        args.color,
        flags.routes || 'routes.json',
        flags.functions
      )

      this.log(`
App to deploy:

app type:        [Create React App]
build folder:    [${args.path}/build]
target project:  [${projectId}]
target color:    [${args.color}]
force flag:      [${flags.force ? true : false}]
`)
    } else if (appTypeId === 'rawWorker') {
      const scriptPath = await cli.prompt(
        'Enter the relative path to your raw script file'
      )
      this.log()

      script = fs.readFileSync(scriptPath, 'utf8')
      this.log(`App to deploy:

app type:        [Raw Worker Script]
script path:     [${scriptPath}]
target project:  [${projectId}]
target color:    [${args.color}]
force flag:      [${flags.force ? true : false}]
`)
    } else if (appTypeId === 'awsLambdaGateway') {
      this.log(`
To deploy the Lambda Gateway run:

dog lambda
`)
      process.exit()
    } else {
      this.log(
        "Either your AppType is not set or it's undefined. Trying running dog apps:init."
      )
      process.exit()
    }

    const bundleHash = createHash('sha1') // we need to verify the upload is :+1:
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
