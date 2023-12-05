import React from 'react'

interface LoginIconProps {
  size?: number
  color?: string
  className?: string
  fillColor?: string
}

const LoginIcon: React.FC<LoginIconProps> = ({ size = 30, color = 'currentColor', className, fillColor }) => (
  <svg width={size} height={size} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M17.5 3.75C17.5 3.05964 18.0596 2.5 18.75 2.5H23.75C24.7446 2.5 25.6984 2.89509 26.4016 3.59835C27.1049 4.30161 27.5 5.25544 27.5 6.25V23.75C27.5 24.7446 27.1049 25.6984 26.4016 26.4017C25.6984 27.1049 24.7446 27.5 23.75 27.5H18.75C18.0596 27.5 17.5 26.9404 17.5 26.25C17.5 25.5596 18.0596 25 18.75 25H23.75C24.0815 25 24.3995 24.8683 24.6339 24.6339C24.8683 24.3995 25 24.0815 25 23.75V6.25C25 5.91848 24.8683 5.60054 24.6339 5.36612C24.3995 5.1317 24.0815 5 23.75 5H18.75C18.0596 5 17.5 4.44036 17.5 3.75Z"
      fill={color}
      className={fillColor}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11.6161 7.86612C12.1043 7.37796 12.8957 7.37796 13.3839 7.86612L19.6339 14.1161C20.122 14.6043 20.122 15.3957 19.6339 15.8839L13.3839 22.1339C12.8957 22.622 12.1043 22.622 11.6161 22.1339C11.128 21.6457 11.128 20.8543 11.6161 20.3661L16.9822 15L11.6161 9.63388C11.128 9.14573 11.128 8.35427 11.6161 7.86612Z"
      fill={color}
      className={fillColor}
    />
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M2.5 15C2.5 14.3096 3.05964 13.75 3.75 13.75H18.75C19.4404 13.75 20 14.3096 20 15C20 15.6904 19.4404 16.25 18.75 16.25H3.75C3.05964 16.25 2.5 15.6904 2.5 15Z"
      fill={color}
      className={fillColor}
    />
  </svg>
)

export default LoginIcon
