import {Command, flags} from '@oclif/command'
import {processResponse} from '../api'
import {cli} from 'cli-ux'
import axios from 'axios'
import {login} from '../login'

const baseURL = process.env.DOG_BASE_URL || 'https://cli.digitaloptgroup.com'

export default class Login extends Command {
  static description = `login to fetch credentials for the cli`

  static flags = {}

  static args = []

  public async run() {
    await login(baseURL)
  }
}
