import { useState } from 'react'

import Image from 'next/image'

import Primary from '@components/Button/Primary'
import { uploadImage } from '@services/Image'
import { ImageDetailsType, useImageHashtagContext } from 'src/context/ImageToHashtagContext'

import ImageUpload from '../ImageUpload'

export interface StepProps {
  step: number
  setStep: (arg: number) => void
}

const Step1 = (props: StepProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-2xl md:flex-row md:p-12 md:shadow-lg">
    </div>
  )
}
export default Step1
