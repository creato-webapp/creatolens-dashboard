import { BodyProps } from './Interface'
import React, { FC, ReactElement } from 'react'

const Body: FC<BodyProps> = ({ children, ...res }): ReactElement => {
  return (
    <tbody {...res}>
      <>{children}</>
    </tbody>
  )
}

export default Body
