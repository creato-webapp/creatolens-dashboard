import * as React from 'react'
import { SVGProps } from 'react'
const SearchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <path
      stroke="#F5F5F5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="m14.5 14-2.9-2.9m1.567-3.767a5.333 5.333 0 1 1-10.667 0 5.333 5.333 0 0 1 10.667 0Z"
    />
  </svg>
)
export default SearchIcon
