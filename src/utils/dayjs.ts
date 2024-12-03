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

export const formatDateRange = (date?: Date, userTimezone?: string) => {
  const timezone = userTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone

  if (!date) return ''
  return new Date(date)
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      timeZone: timezone,
    })
    .toUpperCase()
    .replace(',', '')
}

export const formatDateRangeFromString = (dateRange: { from: string; to: string }) => {
  const { from, to } = dateRange

  return {
    from: from ? new Date(from.replace(' T', ' ')) : undefined,
    to: to ? new Date(to.replace(' T', ' ')) : undefined,
  }
}

export function formatDateTimeToLocal(date: Date, hours = 0, minutes = 0, seconds = 0) {
  if (!date) return ''

  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes, seconds)
  const year = localDate.getFullYear()
  const month = String(localDate.getMonth() + 1).padStart(2, '0') // Months are 0-based
  const day = String(localDate.getDate()).padStart(2, '0')
  const hour = String(localDate.getHours()).padStart(2, '0')
  const minute = String(localDate.getMinutes()).padStart(2, '0')
  const second = String(localDate.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}
