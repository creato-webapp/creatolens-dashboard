import * as React from 'react'
import { SVGProps } from 'react'
const RefreshIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M15.833 2.667v4m0 0h-4m4 0L12.739 3.76A6 6 0 0 0 2.84 6m-1.673 7.334v-4m0 0h4m-4 0 3.093 2.906a6 6 0 0 0 9.9-2.24"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.5 0h16v16H.5z" />
      </clipPath>
    </defs>
  </svg>
)
export default RefreshIcon
