/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {auth} from '../auth'

export default class Logout extends Command {
  static description = `sign out of your account`

  static flags = {}

  static args = []

  public async run() {
    auth.delete('token')
    console.log(
      'You have successfully logged out of Digitial Optimization Group CLI.'
    )
  }
}
