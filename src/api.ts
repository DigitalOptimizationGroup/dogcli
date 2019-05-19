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

const getErrorMessages = (res: AxiosResponse): string[] => {
  if (res.data.errors) {
    return res.data.errors.map((err: any) => errorMessage(err))
  }
  return []
}

const errorMessage = (err: any): string => {
  if (typeof err === 'string') {
    return err
  } else if (err.title && err.detail) {
    return `${err.title}: ${err.detail}`
  } else if (err.title) {
    return err.title
  } else if (err.detail) {
    if (err.source && err.source.pointer) {
      if (err.source.pointer.startsWith('/data/attributes/')) {
        return `${err.source.pointer.replace('/data/attributes/', '')} ${
          err.detail
        }`
      }
    }
    return err.detail
  }
  return ''
}
