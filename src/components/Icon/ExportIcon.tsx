import * as React from 'react'
import { SVGProps } from 'react'
const ExportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="none" {...props}>
    <path
      fill="#000"
      fillRule="evenodd"
      d="M8.146.646a.5.5 0 0 1 .708 0l2.625 2.625a.5.5 0 0 1-.708.708L8.5 1.707 6.229 3.98a.5.5 0 1 1-.708-.708L8.146.646Z"
      clipRule="evenodd"
    />
    <path fill="#000" fillRule="evenodd" d="M8.5.5A.5.5 0 0 1 9 1v7a.5.5 0 0 1-1 0V1a.5.5 0 0 1 .5-.5Z" clipRule="evenodd" />
    <path
      fill="#000"
      fillRule="evenodd"
      d="M3.293 5.793A1 1 0 0 1 4 5.5h1.5a.5.5 0 0 1 0 1H4V13h9V6.5h-1.5a.5.5 0 0 1 0-1H13a1 1 0 0 1 1 1V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6.5a1 1 0 0 1 .293-.707Z"
      clipRule="evenodd"
    />
  </svg>
)
export default ExportIcon
