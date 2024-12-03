import * as React from 'react'
import { SVGProps } from 'react'
const CoffeeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        stroke="#FE7CB5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3.5}
        d="M30 13.334h1.666a6.667 6.667 0 1 1 0 13.333H30m0-13.333H3.333v15A6.667 6.667 0 0 0 10 35h13.333A6.667 6.667 0 0 0 30 28.334v-15ZM10 1.667v5m6.666-5v5m6.667-5v5"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h40v40H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default CoffeeIcon
