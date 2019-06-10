import {REALTIME_LOGS_URL} from './cli-config'
import * as EventSource from 'eventsource'
import {auth} from './auth'
import {getProjectId} from './get-project-id'

export const streamLogs = (
  logType: string,
  prettyjson: boolean,
  filterBy?: string | undefined,
  filterValue?: string | undefined
) => {
  //console.log('Connecting to realtime log stream...')

  const token = auth.get('token')
  const projectId = getProjectId()

  const filters =
    filterBy && filterValue
      ? `&filterBy=${filterBy}&filterValue=${filterValue}`
      : ''

  // if (filterBy && filterValue) {
  //   console.log()
  //   console.log(`Filtering ${filterBy} by ${filterValue}:`)
  //   console.log()
  // }

  const url = `${REALTIME_LOGS_URL}?token=${token}&projectId=${projectId}&logType=${logType}${filters}`

  var source = new EventSource(url)

  source.addEventListener('put', (message: any) => {
    const logLines = JSON.parse(message.data)
    if (logLines.path === '/' && message.data !== null && logLines.data) {
      Object.values(logLines.data).forEach(line => {
        if (prettyjson) {
          console.log(JSON.stringify(line, null, 4))
          console.log()
        } else console.log(JSON.stringify(line))
      })
    } else if (message.data !== null && logLines && logLines.data) {
      if (prettyjson) console.log(JSON.stringify(logLines.data, null, 4))
      else console.log(JSON.stringify(logLines.data))
    }
  })

  source.onmessage = (e: {data: string}) => {
    //console.log(e.data)
  }

  source.onerror = e => {
    console.log(e)
    process.exit()
  }
}
