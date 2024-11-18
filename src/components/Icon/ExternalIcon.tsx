import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M22 15.333v8A2.667 2.667 0 0 1 19.333 26H4.667A2.667 2.667 0 0 1 2 23.333V8.667A2.667 2.667 0 0 1 4.667 6h8M18 2h8m0 0v8m0-8L11.333 16.667"
    />
  </svg>
)
export default SvgComponent
