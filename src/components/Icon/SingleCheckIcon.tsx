import * as React from 'react'
import { SVGProps } from 'react'

const SingleCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16" // Adjust viewBox to your desired default size
    fill="transparent"
    {...props} // This will allow passing width, height, and other props dynamically
  >
    <path stroke="#currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m13.333 4-7.334 7.333L2.666 8" />
  </svg>
)

export default SingleCheck
