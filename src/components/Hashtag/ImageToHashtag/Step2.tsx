import { useEffect, useMemo } from 'react'

import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'

import { Badges } from '@components/Badges'
import Outline from '@components/Button/Outline'
import OutlinePrimaryButton from '@components/Button/OutlinePrimary'
import Primary from '@components/Button/Primary'
import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'

import { StepProps } from './Step1'
import 'react-loading-skeleton/dist/skeleton.css'

const Step2 = (props: StepProps) => {
  const { setStep } = props
  const { images, currentImageIndex, getCurrentImageLabels, updateSelectedLabels, selectAllLabels, loadingLabels } = useImageHashtagContext()

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
    getCurrentImageLabels()
  }

  const onGoBack = () => {
    setStep(1)
  }
  const onClickButton = () => {
    setStep(3)
  }

  const onClickSelectAll = () => {
    selectAllLabels()
  }

  const currentImage = useMemo(() => {
    return images[currentImageIndex]
  }, [images, currentImageIndex, images[currentImageIndex].selectedLabels])

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div className="flex flex-row">
        <div className="w-fit items-center justify-center px-4 text-center text-2xl text-black" onClick={onGoBack}>
          {'<'}
        </div>
        <h2 className="flex items-center font-extrabold">Image label annotation</h2>
      </div>
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
      <div className="my-4 border-b"></div>
      <div className="flex w-full flex-col gap-2 md:w-1/2">
        {currentImage.labels && <h3 className="mb-4 font-semibold text-text-secondary">{`${currentImage.labels?.length}`} labels discovered</h3>}
        <div>
          <div className="flex h-full w-full flex-row flex-wrap gap-4">
            {!loadingLabels ? (
              currentImage.labels &&
              currentImage.labels.map((label) => {
                return (
                  <Badges
                    key={`key-${label}`}
                    rounded
                    // isDisabled={currentImage.selectedLabels.includes(label)}
                    isOutline
                    // isOutline
                    status={!currentImage.selectedLabels.includes(label) ? 'text-secondary' : 'primary'}
                    onClose={() => onClose(label)}
                    onClick={() => onSelected(label)}
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
          <div className="flex flex-col gap-4">
            <OutlinePrimaryButton sizes={['l', 'l', 'l']} onClick={onClickSelectAll}>
              Select All
            </OutlinePrimaryButton>
            <Outline sizes={['l', 'l', 'l']} onClick={onReannotateClick}>
              <Image src="/arrows-clockwise.png" height={24} width={24} alt={'arrows clockwise'} />
              Re-annotate unselected label
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
