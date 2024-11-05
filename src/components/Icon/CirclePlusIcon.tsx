import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M8.25 5.578v5.333M5.585 8.245h5.333m4 0a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.25.246h16v16h-16z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
