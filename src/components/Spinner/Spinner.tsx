import React, { CSSProperties } from 'react'
import {
  secondaryColorDefaultProps,
  SecondaryColorSpinnerProps,
} from './helper'
import { SpinnersProps, withSharedProps } from './WithSharedProps'
import styles from '../styles/SpinnerCircular.module.css'

export type SpinnerCircularProps = SpinnersProps & SecondaryColorSpinnerProps

const Component = ({
  secondaryColor,
  speed = 30,
  still,
  thickness = 20,
  ...svgProps
}: SecondaryColorSpinnerProps) => {
  const strokeWidth = 4 * (thickness / 100)
  const circleStyle: CSSProperties = !still
    ? { animation: `spinners-react-circular ${140 / speed}s linear infinite` }
    : {}

  return (
    <svg fill="none" {...svgProps} viewBox="0 0 66 66">
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
      />
      <circle
        cx="33"
        cy="33"
        fill="none"
        r="28"
        stroke="currentColor"
        strokeDasharray="1, 174"
        strokeDashoffset="306"
        strokeLinecap="round"
        strokeWidth={strokeWidth}
        style={circleStyle}
      />
    </svg>
  )
}

Component.defaultProps = secondaryColorDefaultProps

const SpinnerCircular = withSharedProps(Component)
export default SpinnerCircular
// @keyframes spinners-react-circular {
//     0% { stroke-dashoffset: 306; }
//     50% { stroke-dasharray: 40, 134; }
//     100% {
//       stroke-dasharray: 1, 174;
//       stroke-dashoffset: 132;
//     }
//   }
