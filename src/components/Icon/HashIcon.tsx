import * as React from 'react'
import { SVGProps } from 'react'
const HashIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" {...props}>
    <path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.333 7.5h13.333m-13.333 5h13.333m-8.333-10-1.667 15m6.667-15-1.667 15"
      fill="currentColor"
    />
  </svg>
)
export default HashIcon
