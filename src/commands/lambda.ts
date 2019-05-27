import {apiClient, processResponse} from '../api'
import {AxiosResponse} from 'axios'
import {Command, flags} from '@oclif/command'
import {cli} from 'cli-ux'
import * as fs from 'fs'
import {getProjectId} from '../get-project-id'

export default class Deploy extends Command {
  static description = 'deploy and proxy requests to a lambda function'

  static args = [
    {
      name: 'color',
      description: 'the backend color to point at your new lambda version',
      required: true,
      options: ['blue', 'green']
    },
    {
      name: 'path',
      description:
        'relative path to a single file, non-zipped, lambda function',
      required: true
    }
  ]

  public static flags = {
    force: flags.boolean()
  }

  async run() {
    const {args, flags} = this.parse(Deploy)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log('Deploying lambda function...')
    this.log()

    const script = fs.readFileSync(args.path, 'utf8')

    // const stream = fs.createReadStream(path.resolve(__dirname, args.path))

    this.log(`Lambda to deploy:

build folder:    [${args.path}]
target project:  [${projectId}]
target color:    [${args.color}] 
force flag:      [${flags.force ? true : false}]
`)
    const response = await cli.prompt(
      "Enter 'yes' to deploy (only 'yes' will be accepted)"
    )

    if (response === 'yes') {
      const intervalId = setInterval(() => {
        this.log('deploying...')
      }, 3000)
      const res = await new Promise<AxiosResponse<any>>((resolve, reject) => {
        API.post(`/api/v1/lambda`, script, {
          params: {
            color: args.color,
            projectId,
            force: flags.force
          },
          headers: {
            'Content-Type': 'text/plain'
            // 'Content-Type': 'application/octet-stream',
            // 'Content-Encoding': 'zip'
          },
          maxContentLength: 100 * 1024 * 1024,
          timeout: 120 * 1000
        })
          .then(res => {
            clearInterval(intervalId)
            resolve(res)
          })
          .catch(err => {
            console.log(
              'Sorry that failed, you could try it again or send us this id: ',
              err.response.data
            )
            clearInterval(intervalId)
          })
      })

      processResponse(this, res, () => {
        this.log(`Successfully deployed your lambda at: ${args.color}`)
      })
    } else {
      this.log('Exiting without deploying...')
    }
  }
}
