import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export const DATE_FORMAT = {
  YYYYMMDD_HHMMSS: 'YYYY-MM-DD HH:mm:ss',
  DD_MMM_YYYY: 'DD MMM YYYY',
  HH_mm: 'HH mm',
} as const

export type DATE_FORMAT = typeof DATE_FORMAT

export default dayjs
