import {Command} from '@oclif/command'
import {getProjectId} from '../../get-project-id'

export default class Projects extends Command {
  static description = `show currently selected project`

  static flags = {}

  static args = []

  public async run() {
    const projectId = getProjectId()
    this.log()
    this.log(`Currently selected projectId: ${projectId}`)
    this.log()
  }
}
