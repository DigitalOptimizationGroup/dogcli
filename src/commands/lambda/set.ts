import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')
import {config} from 'cli-ux'

export default class SetLambdaConfig extends Command {
  static description = 'update your lambda deployment config'

  public static flags = {
    function: flags.string({
      char: 'f',
      description: 'ARN of the lambda to update'
    }),
    account: flags.string({
      char: 'a',
      description: 'account ARN you want to assume for deployment (optional)'
    }),
    version: flags.string({
      char: 'v',
      description: 'version you want to send your traffic to'
    }),
    region: flags.string({
      char: 'r',
      description: 'region to deploy into'
    })
  }

  static args = []

  async run() {
    const {flags} = this.parse(SetLambdaConfig)

    const lambdaConfig = configstore.get('lambdaConfig') || {}
    configstore.set('lambdaConfig', {
      ...lambdaConfig,
      ...(flags.function ? {functionArn: flags.function} : {}),
      ...(flags.account ? {ASSUME_ACCOUNT_ARN: flags.account} : {}),
      ...(flags.version ? {VERSION: flags.version} : {}),
      ...(flags.region ? {region: flags.region} : {})
    })
  }
}
