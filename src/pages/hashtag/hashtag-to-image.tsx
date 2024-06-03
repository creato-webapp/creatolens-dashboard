import Outline from '@components/Button/OutlineButton'
import Primary from '@components/Button/PrimaryButton'
import ProgressBar from '@components/Hashtag/ProgressBar'
import Link from 'next/link'
import { useState } from 'react'

const HashtagToImage = () => {
  const [step, setStep] = useState<number>(1)

  return (
    <div className="mx-3 mb-12">
      <div className="mb-4 flex items-center justify-around border-b py-4 text-text-secondary">
        <h2 className="w-20">Hashtag</h2>
        <Link href="/hashtag/image-to-hashtag">
          <img className="w-12 rounded-full bg-accent1-500" src={'/arrow-left-right.svg'} alt="switch Image" />
        </Link>
        <h2 className="w-20">Image</h2>
      </div>
      <div>
        <h1 className="font-extrabold">HASHTAG TO IMAGE</h1>
      </div>
      <div className="my-7">
        <ProgressBar total_step={3} current_step={step} />
      </div>
      <h2 className="font-extrabold">Keywords input</h2>
      <div className="mt-4 flex items-center justify-center">
        <Outline sizes={['l', 'l', 'l']}>+ Get Keywords from Image</Outline>
      </div>
      <div className="my-4 border-b"></div>
      <h3 className="font-semibold text-text-primary">Describe the image you want and we’ll generate image for you.</h3>
      <textarea className="mt-4 min-h-96 w-full border border-black p-5 text-text-disabled" placeholder="Input your own keyword" />
      <div className="mt-4 flex items-center justify-center">
        <Primary sizes={['m', 'm', 'm']}>Next</Primary>
      </div>
    </div>
  )
}

export default HashtagToImage
