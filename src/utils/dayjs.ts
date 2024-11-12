import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone' // Import timezone plugin

dayjs.extend(utc)
dayjs.extend(timezone) // Extend with timezone plugin

export const DATE_FORMAT = {
  YYYYMMDD_HHMMSS: 'YYYY-MM-DD HH:mm:ss',
  DD_MMM_YYYY: 'DD MMM YYYY',
  HH_mm: 'HH mm',
} as const

export type DATE_FORMAT = typeof DATE_FORMAT

export default dayjs

export const formatDateRange = (date?: Date) => {
  if (!date) return ''
  return date
    ? new Date(date)
        .toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })
        .toUpperCase()
        .replace(',', '')
    : ''
}
