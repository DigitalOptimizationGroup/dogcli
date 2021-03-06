/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {Command} from '@oclif/command'
import {configstore} from '../../configstore'
import {apiClient} from '../../api'
import * as inquirer from 'inquirer'

export default class ListApps extends Command {
  static description = `list all apps in your account`

  static flags = {}

  static args = []

  public async run() {
    const API = apiClient(this)

    this.log()
    this.log('Refreshing apps list...')
    this.log()

    const {projects} = await API.post(`/api/v1/refresh-projects`)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error, please try again.')
          process.exit()
        }
        return response.data || {}
      })
      .catch(err => {
        console.log('Error, please try again.')
        process.exit()
      })

    projects.forEach((projectId: string) => {
      this.log(projectId)
    })
    this.log()
  }
}
