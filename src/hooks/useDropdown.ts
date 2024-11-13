import { useCallback, useState } from 'react'

export const useDropdown = (initialState = true) => {
  const [isCollapsed, setIsCollapsed] = useState(initialState)

  const open = useCallback(() => setIsCollapsed(false), [])
  const close = useCallback(() => setIsCollapsed(true), [])
  const toggle = useCallback(() => setIsCollapsed((prev) => !prev), [])

  return { isCollapsed, open, close, toggle }
}
