import * as React from 'react'
import { SVGProps } from 'react'
const SliderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M2.668 13V8.333m0-2.666V1m5.333 12V7m0-2.667V1m5.334 12V9.667m0-2.667V1M.668 8.333h4m1.333-4h4m1.334 5.334h4"
    />
  </svg>
)
export default SliderIcon
