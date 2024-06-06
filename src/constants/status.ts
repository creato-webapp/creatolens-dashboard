const STATUS = {
  active: 'active',
  blocked: 'blocked',
  banned: 'banned',
  retry: 'retry',
  test: 'test',
  scrapping: 'scrapping',
  occupied: 'occupied',
} as const

export type IAccountStatusType =
  | typeof STATUS.active
  | typeof STATUS.blocked
  | typeof STATUS.banned
  | typeof STATUS.retry
  | typeof STATUS.test
  | typeof STATUS.scrapping
  | typeof STATUS.occupied

export default STATUS
