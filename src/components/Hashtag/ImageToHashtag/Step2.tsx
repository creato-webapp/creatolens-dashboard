import { useEffect, useMemo } from 'react'

import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'

import { Badges } from '@components/Badges'
import Outline from '@components/Button/Outline'
import OutlinePrimaryButton from '@components/Button/OutlinePrimary'
import Primary from '@components/Button/Primary'
import { reAnnotateLabel } from '@services/Label'
import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'

import { StepProps } from './Step1'
import 'react-loading-skeleton/dist/skeleton.css'

const Step2 = (props: StepProps) => {
  const { setStep } = props
  const { images, currentImageIndex, getCurrentImageLabels, updateSelectedLabels, selectAllLabels, loadingLabels, updateLabel } =
    useImageHashtagContext()

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

  const onReannotateClick = async () => {
    if (!currentImage.labels || !images[currentImageIndex].image || !images[currentImageIndex].labels) return
    const numberOfUnselectedLabels = currentImage.labels?.length - currentImage.selectedLabels.length
    const data = {
      image_url: images[currentImageIndex].image,
      existing_labels: images[currentImageIndex].labels,
      number: numberOfUnselectedLabels,
    }
    const newLabel = await reAnnotateLabel(data)
    updateLabel(newLabel)
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
  }, [images, currentImageIndex, images[currentImageIndex]])

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div>
        <div className="flex flex-row items-center">
          <div className="required relative h-6 w-6 items-center justify-center px-4 text-center text-2xl text-black" onClick={onGoBack}>
            <Image src={'/back.svg'} fill alt={'back'} />
          </div>
          <h2 className="flex items-center font-extrabold">Image label annotation</h2>
        </div>

        <div className="relative my-4 flex aspect-square h-full w-full min-w-full items-center justify-center rounded-full">
          {currentImage.image && (
            <Image
              fill={true}
              src={currentImage.image}
              objectFit="contain"
              className="rounded-4xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="testing"
            />
          )}
          <div className=" absolute right-5 top-5 flex h-12 w-12 cursor-pointer rounded-full bg-accent1-500 p-4 text-white">
            <div className="flex h-full w-full items-center justify-center">X</div>
          </div>
        </div>
      </div>
      <div className="my-4 border-b md:hidden"></div>
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
                    className="cursor-pointer"
                    // isDisabled={currentImage.selectedLabels.includes(label)}
                    isOutline
                    // isOutline
                    status={!currentImage.selectedLabels.includes(label) ? 'text-secondary' : 'primary'}
                    onClose={() => onClose(label)}
                    onClick={() => onSelected(label)}
                  >
                    {!currentImage.selectedLabels.includes(label) ? '' : <Image src={'/check.svg'} height={24} width={24} alt={'check logo'} />}

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
            <Outline
              sizes={['l', 'l', 'l']}
              onClick={onReannotateClick}
              disabled={currentImage.selectedLabels.length === currentImage.labels?.length}
            >
              <Image src="/arrows-clockwise.png" height={24} width={24} alt={'arrows clockwise'} />
              Re-annotate
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
