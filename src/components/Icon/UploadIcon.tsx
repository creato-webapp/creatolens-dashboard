import * as React from 'react'
import { SVGProps } from 'react'
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="73px" height="73px" fill="none">
    <path
      stroke="#1E1E1E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M65 46.667v12.222A6.111 6.111 0 0 1 58.889 65H16.11A6.111 6.111 0 0 1 10 58.889V46.667m42.778-21.39L37.5 10m0 0L22.222 25.278M37.5 10v36.667"
    />
  </svg>
)
export default SvgComponent
