import Image from 'next/image'
import { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useDialogues } from '@hooks/useDialogues'

import Primary from '@components/Button/Primary'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { Status } from '@context/DialogueContext'

const Step3 = () => {
  const { goBack, generatedImageUri, generateImageWithKeywords, isLoading, error } = useHashtagToImage()
  const { addDialogue } = useDialogues()

  const [isRegenerating, setIsRegenerating] = useState(false)

  const handleRegenerate = async () => {
    setIsRegenerating(true)
    await generateImageWithKeywords()
    setIsRegenerating(false)
  }

  useEffect(() => {
    if (error) {
      addDialogue(error, Status.FAILED)
    }
  }, [addDialogue, error, generatedImageUri])

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
          {(isLoading || isRegenerating) && <Skeleton height="100%" width="100%" className="rounded-3xl" />}
          {error && (
            <div className="flex flex-col items-center justify-center gap-4">
              <Image src={'/failed-icon.svg'} height={48} width={48} alt={'help-circle'} />

              <p className="text-center text-3xl font-bold text-red-500">{error}</p>
            </div>
          )}
          {!isLoading && !isRegenerating && !error && generatedImageUri && (
            <Image
              fill={true}
              src={generatedImageUri}
              objectFit="contain"
              className="rounded-3xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Generated image"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4>Here is the image based on your description. Re-organize input below to get new images.</h4>
        <Primary onClick={handleRegenerate} sizes={['l', 'l', 'l']} disabled={isLoading || isRegenerating}>
          {isRegenerating ? 'Regenerating...' : 'Re-Generate Image'}
        </Primary>
      </div>
    </>
  )
}

export default Step3
