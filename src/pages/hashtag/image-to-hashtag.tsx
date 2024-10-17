import { useCallback, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Details from '@components/Hashtag/Details'
import Step1 from '@components/Hashtag/ImageToHashtag/Step1'
import Step2 from '@components/Hashtag/ImageToHashtag/Step2'
import Step3 from '@components/Hashtag/ImageToHashtag/Step3'
import ProgressBar from '@components/Hashtag/ProgressBar'
import { useImageHashtagContext } from '@hooks/UseImagetoHashtag'

const ImageToHashtag = () => {
  const { step } = useImageHashtagContext()
  const [isDetailPagesOpen, setIsDetailsPageOpen] = useState<boolean>(false)

  const StepComponent = useCallback(() => {
    if (step === 1) {
      return <Step1 />
    } else if (step === 2) {
      return <Step2 />
    } else if (step === 3) {
      return <Step3 />
    } else return <></>
  }, [step])

  if (isDetailPagesOpen)
    return (
      <div className="mx-3 my-4 flex items-center justify-center">
        <Details setIsDetailsPageOpen={() => setIsDetailsPageOpen((pre) => !pre)} />
      </div>
    )

  return (
    <div className="mx-3 my-4 flex items-center justify-center">
      <div className="w-full max-w-screen-md">
        <div className="mt-4 grid grid-cols-3 items-center text-text-secondary">
          <h2 className="flex justify-center">Image</h2>
          <Link href="/hashtag/hashtag-to-image" className="flex justify-center">
            <img className="w-12 rounded-full bg-accent1-500" src={'/arrow-left-right.svg'} alt="switch Image" />
          </Link>
          <h2 className="flex justify-center">Hashtag</h2>
        </div>
        <div className="my-4 border-b"></div>
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-subtitle font-extrabold">IMAGE TO HASHTAG</h1>
            <div className="flex flex-row">
              <Image src="/history.svg" alt={'history'} width={34} height={34}></Image>
              <Image
                onClick={() => setIsDetailsPageOpen((pre) => !pre)}
                className="cursor-pointer"
                src="/help-circle.svg"
                alt={'help'}
                width={34}
                height={34}
              ></Image>
            </div>
          </div>
          <div className="mx-6 my-4 md:my-7">
            <ProgressBar total_step={3} current_step={step} />
          </div>

          <div className="my-4 flex w-full items-center justify-center md:my-12">
            <div className="w-full">
              <StepComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ImageToHashtag
