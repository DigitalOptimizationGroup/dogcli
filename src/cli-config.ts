const version = '0.0.1'

export const CUSTOM_DOMAINS_CNAME = 'custom-domain.edgebayes.com'
export const DOG_BASE_URL =
  process.env.DOG_BASE_URL || 'https://cli.digitaloptgroup.com'
export const USER_AGENT = `@digitaloptgroup/cli/${version}`
export const REALTIME_LOGS_URL = 'https://sse.edgebayes.com/'
