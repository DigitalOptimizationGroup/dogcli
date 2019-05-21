import axios from 'axios'
import {AxiosResponse} from 'axios'
import {Command, flags} from '@oclif/command'
import {configstore} from './configstore'
import {DOG_BASE_URL, USER_AGENT} from './cli-config'

export const apiClient = (cmd: Command) => {
  const baseURL = DOG_BASE_URL

  const token = configstore.get('token')

  if (token === undefined) {
    console.log()
    console.log('You are not currently logged in.')
    console.log()
    console.log(
      'run `dog login` to authenticate your cli and then rerun your command'
    )
    console.log()
    process.exit()
  }

  return axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      Authorization: `Bearer ${token}`,
      'User-Agent': USER_AGENT
    },
    validateStatus: status => {
      return status >= 200 && status < 500
    }
  })
}

export const processResponse = (
  cmd: Command,
  res: AxiosResponse,
  successFn?: () => void
): void => {
  if (res.status >= 200 && res.status < 299) {
    if (successFn) {
      successFn()
    }
  } else {
    if (res.data && res.data.message) {
      cmd.error(res.data.message)
      cmd.exit(1)
    } else {
      throw new Error('Api Error, please try again.')
    }
  }
}
