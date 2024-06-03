import { useState } from 'react'
import ProgressBar from '@components/Hashtag/ProgressBar'
import Primary from '@components/Button/PrimaryButton'
import ImageUpload from '@components/Hashtag/ImageUpload'
import Link from 'next/link'
const ImageToHashtag = () => {
  const [step, setStep] = useState<number>(1)

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
        <h2 className="font-extrabold">Image Upload</h2>
        <div className="mt-4"></div>

        <ImageUpload />
        <div className="mt-4 flex items-center justify-center">
          <Primary sizes={['l', 'l', 'l']}>Annotate</Primary>
        </div>
      </div>
    </div>
  )
}
export default ImageToHashtag
