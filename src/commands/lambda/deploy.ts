import {Command, flags} from '@oclif/command'
import {uploadToLambda} from '../../upload-to-lambda'
import {configstore} from '../../configstore'
import * as fs from 'fs'
import {apiClient, processResponse} from '../../api'
import {AxiosResponse} from 'axios'
import {cli} from 'cli-ux'
import {getProjectId} from '../../get-project-id'

type LambdaConfig = {
  functionArn: string
  ASSUME_ACCOUNT_ARN: string | undefined
  region: string
}

export default class DeployLambda extends Command {
  static description = `helper to deploy a lambda to your AWS account (requires AWS keys in your environment)`

  public static flags = {
    force: flags.boolean()
  }

  static args = [
    {
      name: 'color',
      description: 'backend color to point at your new lambda version',
      required: true,
      options: ['blue', 'green']
    },
    {
      name: 'path',
      description: 'path to your zipped lambda function',
      required: true
    }
  ]

  public async run() {
    const {args, flags} = this.parse(DeployLambda)
    const API = apiClient(this)
    const lambdaConfig: LambdaConfig = configstore.get('lambdaConfig')
    const projectId = getProjectId()

    const functionArn =
      lambdaConfig.functionArn || process.env.LAMBDA_FUNCTION_NAME
    const region = lambdaConfig.region || process.env.AWS_REGION
    const assumeAccountArn =
      lambdaConfig.ASSUME_ACCOUNT_ARN || process.env.ASSUME_ACCOUNT_ARN

    try {
      fs.statSync(args.path)
    } catch (e) {
      this.log(`
You zip file was not found at: ${args.path}
`)
      process.exit(1)
    }

    if (functionArn === undefined || region === undefined) {
      this.log(`
Lambda ARN & AWS Region must be set to deploy. Run:

dog lambda:set --help
`)
      process.exit()
    }

    this.log(`
Lambda to deploy:

zipped lambda:   [${args.path}]
target lambda:   [${functionArn}]

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
      const arn = await uploadToLambda(
        lambdaConfig.functionArn,
        args.path,
        region as string,
        lambdaConfig.ASSUME_ACCOUNT_ARN
      )
      const res = await new Promise<AxiosResponse<any>>((resolve, reject) => {
        API.post(`/api/v1/lambda`, '', {
          params: {
            color: args.color,
            projectId,
            force: flags.force,
            arn
          },
          headers: {
            'Content-Type': 'text/plain'
          }
        })
          .then(res => {
            clearInterval(intervalId)
            if (!res.status || res.status !== 200) {
              if (res.data.message) {
                console.log('Failed: ', res.data.message)
                process.exit()
              }
              console.log(
                'Sorry that failed, you could try it again or contact us.'
              )
              process.exit()
            }
            resolve(res)
          })
          .catch(err => {
            clearInterval(intervalId)
            if (err && err.response && err.response.data) {
              console.log(
                'Sorry that failed, you could try it again or send us this id: ',
                err && err.response && err.response.data
              )
              process.exit()
            }
            console.log(err && err.response && err.response.message)
            process.exit()
          })
      })

      processResponse(this, res, () => {
        this.log(`Successfully deployed your lambda ${arn} at: ${args.color}`)
      })
    } else {
      this.log('Exiting without deploying...')
    }
  }
}
