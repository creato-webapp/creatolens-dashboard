const SIZE = {
  S: 'small',
  M: 'medium',
  L: 'large',
} as const

export type ISizeType = typeof SIZE.S | typeof SIZE.M | typeof SIZE.L

export default SIZE
