export const dateFilter = {
  THIS_WEEK: 'This Week',
  THIS_MONTH: 'This Month',
  LAST_WEEK: 'Last Week',
  LAST_MONTH: 'Last Month',
} as const

export type DateFilterKeys = keyof typeof dateFilter
