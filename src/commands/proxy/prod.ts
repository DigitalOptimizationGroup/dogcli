/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
const logSymbols = require('log-symbols')
import {DefaultConfig} from '@digitaloptgroup/types/proxy'

export default class ProductionBackend extends Command {
  static description = `set your local proxy config to a single production backend`

  static examples = [
    `$ dog proxy:prod blue

# Set any FQDN as the production backend
$ dog proxy:prod https://www.example.com
`
  ]

  static flags = {}

  static args = [
    {
      name: 'productionBackend',
      description:
        'a valid deployed color or a fully qualified domain name to set as your single production backend',
      required: true
    }
  ]

  async run() {
    const {args} = this.parse(ProductionBackend)

    const proxyConfig: DefaultConfig = {
      mode: 'productionBackend',
      productionBackend: args.productionBackend
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
    this.log('dog proxy:apply')
    this.log()
  }
}
