import { useCallback } from 'react'

import Link from 'next/link'

import Step1 from '@components/Hashtag/HashtagToImage/Step1'
import Step2 from '@components/Hashtag/HashtagToImage/Step2'
import Step3 from '@components/Hashtag/HashtagToImage/Step3'
import ProgressBar from '@components/Hashtag/ProgressBar'
import { useHashtagToImage } from '@hooks/useHashtagToImage'

const HashtagToImage = () => {
  const { step } = useHashtagToImage()

  const StepComponent = useCallback(() => {
    if (step === 1) {
      return <Step1 />
    } else if (step === 2) return <Step2 />
    else if (step === 3) return <Step3 />
    else return null
  }, [step])

  return (
    <div className="mx-3 my-4 flex items-center justify-center">
      <div className="w-full max-w-screen-md">
        <div className="mb-4 flex items-center justify-around border-b py-4 text-text-secondary">
          <h2 className="w-20">Hashtag</h2>
          <Link href="/hashtag/image-to-hashtag">
            <img className="w-12 rounded-full bg-accent1-500" src={'/arrow-left-right.svg'} alt="switch Image" />
          </Link>
          <h2 className="w-20">Image</h2>
        </div>
        <div>
          <h1 className="text-title font-extrabold">HASHTAG TO IMAGE</h1>
        </div>
        <div className="my-7">
          <ProgressBar total_step={3} current_step={step} />
        </div>
        <div className="my-12 flex w-full items-center justify-center">
          <div className="w-full max-w-[900px]">
            <StepComponent />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HashtagToImage
