/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {login} from '../login'

const baseURL = process.env.DOG_BASE_URL || 'https://cli.digitaloptgroup.com'

export default class Login extends Command {
  static description = `sign in to your account`

  static flags = {}

  static args = []

  public async run() {
    await login(baseURL)
  }
}
