import * as React from 'react'
import { SVGProps } from 'react'
const RepeatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        stroke="#F5F5F5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M11.833.666 14.5 3.333m0 0-2.667 2.666M14.5 3.333H5.167A2.667 2.667 0 0 0 2.5 5.999v1.334m2.667 8L2.5 12.666m0 0 2.667-2.667M2.5 12.666h9.333A2.667 2.667 0 0 0 14.5 9.999V8.666"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h16v16H.5z" />
      </clipPath>
    </defs>
  </svg>
)
export default RepeatIcon
