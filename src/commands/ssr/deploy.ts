/*
 * Copyright Digital Optimization Group LLC
 * 2019 - present
 */
import {apiClient, processResponse} from '../../api'
import {createHash} from 'crypto'
import {AxiosResponse} from 'axios'
import {Command, flags} from '@oclif/command'
import {cli, config} from 'cli-ux'
import {getProjectId} from '../../get-project-id'
import {configstore} from '../../configstore'
import * as inquirer from 'inquirer'
import * as fs from 'fs'
import {bundleBuildFolder} from '../../makevfs'

export default class ApplyApp extends Command {
  static description = 'deploy your application'

  static examples = [
    'dog deploy blue',
    'dog deploy blue --force',
    'dog deploy green --path ./custom/script.js'
  ]

  static args = [
    {
      name: 'color',
      description: 'the backend color to deploy to',
      required: true,
      // options wants to be dynamic - pull from config?
      options: ['blue', 'green']
    }
  ]

  public static flags = {
    force: flags.boolean(),
    path: flags.string({
      char: 'p'
    })
  }

  async run() {
    const {args, flags} = this.parse(ApplyApp)
    const API = apiClient(this)
    const projectId = getProjectId()

    this.log('Preparing for deployment...')
    this.log()

    const vfs = bundleBuildFolder()

    this.log(`
    App to deploy:

    target project:  [${projectId}]
    target color:    [${args.color}]
    force flag:      [${flags.force ? true : false}]
    `)

    this.log()
    const response = await cli.prompt(
      "Enter 'yes' to deploy (only 'yes' will be accepted)"
    )

    if (response === 'yes') {
      const res = await new Promise<AxiosResponse<any>>((resolve, reject) => {
        API.post(`/api/v1/ssr`, JSON.stringify(vfs), {
          params: {
            color: args.color,
            projectId,
            force: flags.force
          },
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Length': gz.byteLength,
            // 'Content-Encoding': 'gzip'
          },
          maxContentLength: 100 * 1024 * 1024,
          timeout: 120 * 1000
        })
          .then(resolve)
          .catch(reject)
      })

      processResponse(this, res, () => {
        this.log(`
    Successfully deployed to your: ${args.color} backend

    https://${args.color}-${projectId}.edgefisher.com

    Or visit with gatekeeping
    dog proxy:gatekeep ${args.color}
    `)
      })
    } else {
      this.log('Exiting without deploying...')
    }
  }
}
