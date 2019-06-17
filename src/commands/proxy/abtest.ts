/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')
import * as uuid from 'uuid/v4'
import {AbConfig} from '@digitaloptgroup/types/proxy'

export default class AbTest extends Command {
  static description = 'deploy a/b/n tests across any number of origins'

  static flags = {
    origin: flags.string({
      description: 'FQDN for an A/B test backend or a valid deployed color',
      multiple: true,
      required: true,
      char: 'o'
    })
  }

  static args = []

  async run() {
    const {args, flags} = this.parse(AbTest)

    if (flags.origin.length < 2) {
      this.log()
      this.log(logSymbols.error, 'A/B testing requires at least two backends.')
      this.log(
        'Rerun this command with at least two origin flags. For example dog proxy:abtest -o blue -o green'
      )
      this.log()

      process.exit()
    }

    const proxyConfig: AbConfig = {
      mode: 'abtest',
      origins: flags.origin,
      salt: uuid()
    }

    configstore.set('proxyConfig', proxyConfig)

    this.log()
    this.log(
      logSymbols.success,
      'Successfully updated your local proxy config: '
    )
    this.log()
    this.log(JSON.stringify(configstore.get('proxyConfig'), null, 4))
    this.log()
    this.log('To deploy this config into production run:')
    this.log()
    this.log('dog proxy:apply')
    this.log()
  }
}
