import * as React from 'react'
import { SVGProps } from 'react'
const RepeatedIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M15.183 2.683a.625.625 0 0 1 .884 0l1.875 1.875a.625.625 0 0 1 0 .884l-1.875 1.875a.625.625 0 1 1-.884-.884L16.616 5l-1.433-1.433a.625.625 0 0 1 0-.884Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillRule="evenodd"
      d="M7.499 4.375H17.5a.625.625 0 1 1 0 1.25h-10a4.383 4.383 0 0 0-4.375 4.376.625.625 0 0 1-1.25-.002 5.633 5.633 0 0 1 5.624-5.624ZM4.817 12.683a.625.625 0 0 1 0 .884L3.384 15l1.433 1.433a.625.625 0 1 1-.884.884l-1.875-1.875a.625.625 0 0 1 0-.884l1.875-1.875a.625.625 0 0 1 .884 0Z"
      clipRule="evenodd"
    />
    <path
      fill="#000"
      fillRule="evenodd"
      d="M17.501 9.375c.345 0 .624.28.624.626a5.633 5.633 0 0 1-5.624 5.624H2.5a.625.625 0 1 1 0-1.25h10a4.383 4.383 0 0 0 4.375-4.376c0-.345.28-.625.626-.624Z"
      clipRule="evenodd"
    />
  </svg>
)
export default RepeatedIcon
