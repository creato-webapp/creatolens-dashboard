import * as React from 'react'
import { SVGProps } from 'react'
const TrendUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        stroke="#00B2FB"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.5}
        d="M39 10 23.168 25.833 14.834 17.5 2.334 30m36.667-20H29m10 0v10"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.667 0h40v40h-40z" />
      </clipPath>
    </defs>
  </svg>
)
export default TrendUpIcon
