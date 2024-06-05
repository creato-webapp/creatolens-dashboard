import { useCallback, useState } from 'react'
import ProgressBar from '@components/Hashtag/ProgressBar'
import Link from 'next/link'
import Step1 from '@components/Hashtag/ImageToHashtag/Step1'
import Step2 from '@components/Hashtag/ImageToHashtag/Step2'
import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'
const ImageToHashtag = () => {
  const [step, setStep] = useState<number>(1)
  const {} = useImageHashtagContext()

  const StepComponent = useCallback(() => {
    if (step === 1) {
      return <Step1 step={step} setStep={setStep} />
    } else if (step === 2) {
      return <Step2 step={step} setStep={setStep} />
    } else return <></>
  }, [step])

  return (
    <div className="mx-3">
      <div className="mt-4 grid grid-cols-3 items-center text-text-secondary">
        <h2 className="flex justify-center">Image</h2>
        <Link href="/hashtag/hashtag-to-image" className="flex justify-center">
          <img className="w-12 rounded-full bg-accent1-500" src={'/arrow-left-right.svg'} alt="switch Image" />
        </Link>
        <h2 className="flex justify-center">Hashtag</h2>
      </div>
      <div className="my-4 border-b"></div>
      <div>
        <div>
          <h1 className="font-extrabold">IMAGE TO HASHTAG</h1>
        </div>
        <div className="my-7">
          <ProgressBar total_step={3} current_step={step} />
        </div>
        <StepComponent />
      </div>
    </div>
  )
}
export default ImageToHashtag
