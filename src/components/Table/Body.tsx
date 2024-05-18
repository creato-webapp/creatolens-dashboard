import React, { FC, ReactElement } from 'react'

import { BodyProps } from './Interface'

const Body: FC<BodyProps> = ({ children, ...res }): ReactElement => {
  return (
    <tbody {...res}>
      <>{children}</>
    </tbody>
  )
}

export default Body
