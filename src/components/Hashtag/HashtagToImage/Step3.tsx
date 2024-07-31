import Image from 'next/image'

import Primary from '@components/Button/Primary'
import { useHashtagToImage } from '@hooks/useHashtagToImage'

const Step3 = () => {
  const { goBack } = useHashtagToImage()
  const imageURL = '/logo_orange.png'

  return (
    <>
      <div className="flex flex-row items-center">
        <div className="required relative h-6 w-6 cursor-pointer items-center justify-center px-4 text-center text-2xl text-black" onClick={goBack}>
          <Image src={'/back.svg'} fill alt={'back'} />
        </div>
        <h2 className="font-extrabold">Result</h2>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <div className="relative my-4 h-56 w-full">
          {imageURL && (
            <Image
              fill={true}
              src={imageURL}
              objectFit="contain"
              className="rounded-3xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="testing"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h4>Here is the image based on your description. Re-organize input below to get new images.</h4>
        <Primary onClick={goBack} sizes={['full', 'full', 'full']}>
          Re-Generate Image
        </Primary>
      </div>
    </>
  )
}

export default Step3
