import { BodyProps } from './Interface'
import React, { FC, ReactElement } from 'react'

const Body: FC<BodyProps> = (props: BodyProps): ReactElement => {
  return (
    <tbody>
      <>{props.children}</>
    </tbody>
  )
}

export default Body
