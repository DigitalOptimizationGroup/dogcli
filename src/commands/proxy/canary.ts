/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command, flags} from '@oclif/command'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')
import * as uuid from 'uuid/v4'
import {CanaryConfig} from '@digitaloptgroup/types/proxy'

export default class AbTest extends Command {
  static description = 'run and manage canary releases'

  static flags = {
    production: flags.string({
      description: 'FQDN for production backend or a valid deployed color',
      char: 'p',
      required: true
    }),
    canary: flags.string({
      description: 'FQDN for an canary backend or a valid deployed color',
      char: 'c',
      required: true
    }),
    weight: flags.integer({
      description:
        'an integer between 1 and 100 that will equal the percentage of traffic sent to the canary',
      required: true,
      char: 'w'
    }),
    reassign: flags.boolean({
      description:
        'forces a new salt to be created and all currently assigned visitors to be reallocated to a random backend - not recommended'
    }),
    force: flags.boolean({
      description:
        'force the proxy config to do something that it not recommended'
    })
  }

  static args = []

  async run() {
    const {flags} = this.parse(AbTest)
    const currentProxyConfig = configstore.get('proxyConfig') || {}
    const productionBackend =
      flags.production || currentProxyConfig.productionBackend
    const canaryBackend = flags.canary || currentProxyConfig.canaryBackend

    // validate weight
    if (flags.weight < 1 || flags.weight > 100) {
      this.log()
      this.log(
        logSymbols.error,
        `Weight must be an integer between 1 and 100. Rerun with a valid value. You provided: ${
          flags.weight
        }`
      )
      this.log()

      process.exit()
    }

    // if production not set anywhere
    if (!productionBackend) {
      this.log()
      this.log(
        logSymbols.error,
        'A production backend is required. None listed in current local config nor flag.'
      )
      this.log('Rerun with a backend set using the --production (-p) flag.')
      this.log()

      process.exit()
    }

    // if canary not set anywhere
    if (!canaryBackend) {
      this.log()
      this.log(
        logSymbols.error,
        'A canary backend is required. None listed in current local config nor flag.'
      )
      this.log('Rerun with a backend set using the --canary (-c) flag.')
      this.log()

      process.exit()
    }

    const salt = flags.reassign
      ? // force a new salt
        uuid()
      : // if we currently have a canary config, then use that salt only if
      // the canaryBackend & productionBackend have not changed
      currentProxyConfig.mode === 'canary' &&
        (currentProxyConfig.canaryBackend === flags.canary &&
          currentProxyConfig.productionBackend === productionBackend)
      ? currentProxyConfig.salt
      : // else set a new salt
        uuid()

    if (
      currentProxyConfig.weight &&
      currentProxyConfig.weight > flags.weight &&
      !flags.force
    ) {
      this.log()
      this.log(
        logSymbols.error,
        'You are decreasing the weight and this can lead to undesireable user reassignment.'
      )
      this.log(
        'If you mean to do this rerun the command with the --force flag set.'
      )
      this.log()

      process.exit()
    }

    const proxyConfig: CanaryConfig = {
      mode: 'canary',
      productionBackend,
      canaryBackend: flags.canary,
      weight: flags.weight,
      salt
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
