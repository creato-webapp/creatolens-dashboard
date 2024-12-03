import * as React from 'react'
import { SVGProps } from 'react'
const PenIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <path
      stroke="#9374FA"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M3.333 3.333 27.5 9.166l2.5 12.5L21.666 30l-12.5-2.5L3.333 3.333Zm0 0 12.643 12.643M20 31.666 31.666 20l5 5L25 36.666l-5-5Zm1.666-13.333a3.333 3.333 0 1 1-6.666 0 3.333 3.333 0 0 1 6.666 0Z"
    />
  </svg>
)
export default PenIcon
