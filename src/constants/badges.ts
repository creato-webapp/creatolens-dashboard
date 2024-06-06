const BADGES = {
  primary: 'primary',
  secondary: 'secondary',
  'text-primary': 'text-primary',
  'text-secondary': 'text-secondary',
  disabled: 'disabled',
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const

export type BadgesType =
  | typeof BADGES.primary
  | typeof BADGES.secondary
  | (typeof BADGES)['text-primary']
  | (typeof BADGES)['text-secondary']
  | typeof BADGES.disabled
  | typeof BADGES.success
  | typeof BADGES.warning
  | typeof BADGES.error

export default BADGES
