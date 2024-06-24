import { useEffect, useMemo, useState } from 'react'

import Image from 'next/image'

import { Badges } from '@components/Badges'
import Outline from '@components/Button/Outline'
import Primary from '@components/Button/Primary'
import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'

import { StepProps } from './Step1'

const Step2 = (props: StepProps) => {
  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
    </div>
  )
}

export default Step2
