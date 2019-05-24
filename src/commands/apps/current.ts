import {Command} from '@oclif/command'
import {configstore} from '../../configstore'

export default class Projects extends Command {
  static description = `show currently selected project`

  static flags = {}

  static args = []

  public async run() {
    this.log()
    this.log(`Currently selected projectId: ${configstore.get('projectId')}`)
    this.log()
  }
}
