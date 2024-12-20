import React from 'react'

interface LogoutIconProps {
  size?: number
  color?: string
  className?: string
  fillColor?: string
}

const LogoutIcon: React.FC<LogoutIconProps> = ({ size = 30, color = 'currentColor', className, fillColor }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g id="Fether Icons /log-out">
      <path
        id="Vector (Stroke)"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 5C5.91848 5 5.60054 5.1317 5.36612 5.36612C5.1317 5.60054 5 5.91848 5 6.25V23.75C5 24.0815 5.1317 24.3995 5.36612 24.6339C5.60054 24.8683 5.91848 25 6.25 25H11.25C11.9404 25 12.5 25.5596 12.5 26.25C12.5 26.9404 11.9404 27.5 11.25 27.5H6.25C5.25544 27.5 4.30161 27.1049 3.59835 26.4017C2.89509 25.6984 2.5 24.7446 2.5 23.75V6.25C2.5 5.25544 2.89509 4.30161 3.59835 3.59835C4.30161 2.89509 5.25544 2.5 6.25 2.5H11.25C11.9404 2.5 12.5 3.05964 12.5 3.75C12.5 4.44036 11.9404 5 11.25 5H6.25Z"
        className={fillColor}
        fill={color}
      />
      <path
        id="Vector (Stroke)_2"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.1161 7.86612C19.6043 7.37796 20.3957 7.37796 20.8839 7.86612L27.1339 14.1161C27.622 14.6043 27.622 15.3957 27.1339 15.8839L20.8839 22.1339C20.3957 22.622 19.6043 22.622 19.1161 22.1339C18.628 21.6457 18.628 20.8543 19.1161 20.3661L24.4822 15L19.1161 9.63388C18.628 9.14573 18.628 8.35427 19.1161 7.86612Z"
        className={fillColor}
        fill={color}
      />
      <path
        id="Vector (Stroke)_3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 15C10 14.3096 10.5596 13.75 11.25 13.75H26.25C26.9404 13.75 27.5 14.3096 27.5 15C27.5 15.6904 26.9404 16.25 26.25 16.25H11.25C10.5596 16.25 10 15.6904 10 15Z"
        className={fillColor}
        fill={color}
      />
    </g>
  </svg>
)

export default LogoutIcon
