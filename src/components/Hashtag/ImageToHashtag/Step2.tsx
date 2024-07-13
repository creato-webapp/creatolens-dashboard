import { useEffect, useMemo, useState } from 'react'

import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'

import { Badges } from '@components/Badges'
import Outline from '@components/Button/Outline'
import Primary from '@components/Button/Primary'
import { useImageHashtagContext } from '@context/ImageToHashtagContext'

import { StepProps } from './Step1'
import 'react-loading-skeleton/dist/skeleton.css'

const Step2 = (props: StepProps) => {
  const { setStep } = props
  const { images, currentImageIndex, getCurrentImageLabels, updateSelectedLabels, loadingLabels } = useImageHashtagContext()
  const [reAnnotateTimes, setReAnnotateTimes] = useState<number>(1)

  useEffect(() => {
    const currentImageObj = images[currentImageIndex]
    if (currentImageObj && !currentImageObj.labels) {
      getCurrentImageLabels()
    }
  }, [])

  const onClose = (label: string) => {
    updateSelectedLabels(label)
  }

  const onSelected = (label: string) => {
    updateSelectedLabels(label)
  }

  const onReannotateClick = () => {
    setReAnnotateTimes((pre) => pre + 1)
    getCurrentImageLabels()
  }
  const onClickButton = () => {
    setStep(3)
  }

  const currentImage = useMemo(() => {
    return images[currentImageIndex]
  }, [images, currentImageIndex])

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div className="relative my-4 flex h-48 w-full items-center justify-center md:w-1/2">
        {currentImage.image && (
          <Image
            fill={true}
            src={currentImage.image}
            objectFit="contain"
            className="rounded-3xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="testing"
          />
        )}
      </div>
      <div className="flex w-full flex-col gap-2 md:w-1/2">
        <h2 className="font-extrabold">Image label annotation</h2>
        {currentImage.labels && (
          <h3 className="font-semibold">Selected labels: {`${currentImage.selectedLabels.length} / ${currentImage.labels?.length}`}:</h3>
        )}
        <div>
          <div className="flex h-full w-full flex-row flex-wrap gap-4">
            {!loadingLabels ? (
              currentImage.labels &&
              currentImage.labels.map((label) => {
                return (
                  <Badges
                    key={`key-${label}`}
                    rounded
                    closeable
                    isOutline={!currentImage.selectedLabels.includes(label)}
                    onClose={() => onClose(label)}
                    onClick={() => onSelected(label)}
                    status={'primary'}
                  >
                    {label}
                  </Badges>
                )
              })
            ) : (
              <Skeleton count={3} style={{ height: 40 }} containerClassName="flex-1" />
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-6">
            <Outline sizes={['l', 'l', 'l']} onClick={onReannotateClick}>
              <Image src="/arrows-clockwise.png" height={24} width={24} alt={'arrows clockwise'} />
              Re-Annotate({reAnnotateTimes})
            </Outline>
            <Primary sizes={['l', 'l', 'l']} onClick={onClickButton}>
              + Get Hashtag
            </Primary>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2
