/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {getProjectId} from '../../get-project-id'

export default class Projects extends Command {
  static description = `show currently selected application`

  static flags = {}

  static args = []

  public async run() {
    const projectId = getProjectId()
    this.log()
    this.log(`Currently selected appId: ${projectId}`)
    this.log()
  }
}
