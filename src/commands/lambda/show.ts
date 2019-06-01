import {Command} from '@oclif/command'
import {configstore} from '../../configstore'

export default class Show extends Command {
  static description = 'show current lambda config'

  async run() {
    const lambdaConfig = configstore.get('lambdaConfig') || {}

    this.log(`
Current lambda configurations:

functionArn:    [${lambdaConfig.functionArn}]
version:        [${lambdaConfig.VERSION}]${
      lambdaConfig.ASSUME_ACCOUNT_ARN
        ? `\nAssume Account: [${lambdaConfig.ASSUME_ACCOUNT_ARN}]`
        : ''
    }
`)
  }
}
