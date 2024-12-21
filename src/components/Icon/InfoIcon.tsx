import * as React from 'react'
import { SVGProps } from 'react'
const InfoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        stroke="#757575"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.001 13.333V9.999m0-3.333h.009m8.325 3.333a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default InfoIcon
