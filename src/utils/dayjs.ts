import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const DATE_FORMATE = {
  YYYYMMDD_HHMMSS: 'YYYY-MM-DD HH:mm:ss',
} as const

export default dayjs
