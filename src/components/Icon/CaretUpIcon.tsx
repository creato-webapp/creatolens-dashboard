import React from 'react'

interface CaretUpIconProps {
  size?: number
  color?: string
  className?: string
}

const CaretUpIcon: React.FC<CaretUpIconProps> = ({ size = 24, color = 'currentColor', className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.4697 6.96967C11.7626 6.67678 12.2374 6.67678 12.5303 6.96967L20.0303 14.4697C20.3232 14.7626 20.3232 15.2374 20.0303 15.5303C19.7374 15.8232 19.2626 15.8232 18.9697 15.5303L12 8.56066L5.03033 15.5303C4.73744 15.8232 4.26256 15.8232 3.96967 15.5303C3.67678 15.2374 3.67678 14.7626 3.96967 14.4697L11.4697 6.96967Z"
      fill={color}
    />
  </svg>
)

export default CaretUpIcon
