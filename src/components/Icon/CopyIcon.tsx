import * as React from 'react'
const CopyIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" {...props}>
    <g clipPath="url(#a)">
      <path
        stroke="#1E1E1E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3.334 10h-.667a1.333 1.333 0 0 1-1.333-1.333v-6a1.333 1.333 0 0 1 1.333-1.333h6a1.333 1.333 0 0 1 1.334 1.333v.667M7.334 6.001h6c.736 0 1.333.597 1.333 1.333v6c0 .736-.597 1.333-1.333 1.333h-6a1.333 1.333 0 0 1-1.333-1.333v-6c0-.736.597-1.333 1.333-1.333Z"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default CopyIcon
