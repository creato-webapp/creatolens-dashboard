import * as React from 'react'
import { SVGProps } from 'react'
const ThumbUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32px" height="32px" fill="none" color="currentColor" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m9.334 14.667 5.333-12a4 4 0 0 1 4 4V12h7.547a2.668 2.668 0 0 1 2.666 3.067l-1.84 12a2.666 2.666 0 0 1-2.666 2.267H9.334m0-14.667v14.667m0-14.667h-4a2.667 2.667 0 0 0-2.667 2.667v9.333a2.667 2.667 0 0 0 2.667 2.667h4"
    />
  </svg>
)
export default ThumbUpIcon
