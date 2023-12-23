import React from 'react'

interface SortingIconProps {
  size?: number
  color?: string
  className?: string
  fillColor?: string
}

const SortingIcon: React.FC<SortingIconProps> = ({ size = 12, color, className, fillColor }) => (
  <svg width="12" height="8" viewBox="0 0 12 8" fill={fillColor} xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      id="Vector"
      d="M11.5045 4.81804L7.17613 0.489643C6.52437 -0.162124 5.47152 -0.162124 4.81975 0.489642L0.491352 4.81804C-0.561501 5.87089 0.190536 7.67578 1.6779 7.67578L10.3347 7.67578C11.8221 7.67578 12.5574 5.87089 11.5045 4.81804Z"
      fill={color}
      className={fillColor}
    />
  </svg>
)

export default SortingIcon
