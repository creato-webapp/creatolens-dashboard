import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const DATE_FORMAT = {
  YYYYMMDD_HHMMSS: 'YYYY-MM-DD HH:mm:ss',
  DD_MMM_YYYY: 'DD MMM YYYY',
} as const

export default dayjs
