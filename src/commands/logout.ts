import {Command} from '@oclif/command'
import {configstore} from '../configstore'

export default class Logout extends Command {
  static description = `sign out of your account`

  static flags = {}

  static args = []

  public async run() {
    configstore.delete('token')
    console.log(
      'You have successfully logged out of Digitial Optimization Group CLI.'
    )
  }
}
