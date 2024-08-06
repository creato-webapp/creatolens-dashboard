import React, { useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Badges } from '@components/Badges'
import Outline from '@components/Button/Outline'
import OutlinePrimaryButton from '@components/Button/OutlinePrimary'
import Primary from '@components/Button/Primary'
import { useImageHashtagContext } from '@hooks/UseImagetoHashtag'

const BACK_ICON = '/back.svg'
const CHECK_ICON = '/check.svg'
const ARROWS_CLOCKWISE_ICON = '/arrows-clockwise.png'

const Step2 = () => {
  const { images, currentImageIndex, getCurrentImageLabels, updateSelectedLabels, selectAllLabels, loadingLabels, updateLabel, goBack, goForward } =
    useImageHashtagContext()

  const currentImage = useMemo(() => images[currentImageIndex], [images, currentImageIndex])

  useEffect(() => {
    if (currentImage && !currentImage.labels) {
      getCurrentImageLabels()
    }
  }, [currentImage, getCurrentImageLabels])

  const onClose = useCallback(
    (label: string) => {
      updateSelectedLabels(label)
    },
    [updateSelectedLabels]
  )

  const onSelected = useCallback(
    (label: string) => {
      updateSelectedLabels(label)
    },
    [updateSelectedLabels]
  )

  const onReannotateClick = useCallback(async () => {
    if (!currentImage.labels || !currentImage.image) return
    const numberOfUnselectedLabels = currentImage.labels.length - currentImage.selectedLabels.length
    const data = {
      image_url: currentImage.image,
      existing_labels: currentImage.labels,
      number: numberOfUnselectedLabels,
    }
    updateLabel(data)
  }, [currentImage, updateLabel])

  const renderLabels = useMemo(() => {
    if (loadingLabels) {
      return <Skeleton count={3} style={{ height: 40 }} containerClassName="flex-1" />
    }

    return currentImage?.labels?.map((label) => (
      <Badges
        key={`key-${label}`}
        rounded
        className="cursor-pointer"
        isOutline
        status={!currentImage.selectedLabels.includes(label) ? 'text-secondary' : 'primary'}
        onClose={() => onClose(label)}
        onClick={() => onSelected(label)}
      >
        {currentImage.selectedLabels.includes(label) && (
          <Image src={CHECK_ICON} id="check-icon" key="check" height={24} width={24} alt="check logo" />
        )}
        {label}
      </Badges>
    ))
  }, [currentImage, loadingLabels, onClose, onSelected])

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div>
        <div className="flex flex-row items-center">
          <div className="required relative h-6 w-6 cursor-pointer items-center justify-center px-4 text-center text-2xl text-black" onClick={goBack}>
            <Image src={BACK_ICON} fill alt="back" />
          </div>
          <h2 className="flex items-center font-extrabold">Image label annotation</h2>
        </div>

        <div className="relative my-4 flex aspect-square h-full w-full min-w-full items-center justify-center rounded-full">
          {currentImage?.image && (
            <Image
              fill
              src={currentImage.image}
              objectFit="contain"
              className="rounded-4xl"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="testing"
            />
          )}
        </div>
      </div>
      <div className="my-4 border-b md:hidden"></div>
      <div className="flex w-full flex-col gap-2 md:w-1/2">
        {currentImage?.labels && <h3 className="mb-4 font-semibold text-text-secondary">{`${currentImage.labels.length}`} labels discovered</h3>}
        <div>
          <div className="flex h-full w-full flex-row flex-wrap gap-4">{renderLabels}</div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <OutlinePrimaryButton sizes={['l', 'l', 'l']} onClick={selectAllLabels}>
              Select All
            </OutlinePrimaryButton>
            <Outline
              sizes={['l', 'l', 'l']}
              onClick={onReannotateClick}
              disabled={currentImage?.selectedLabels.length === currentImage?.labels?.length}
            >
              <Image src={ARROWS_CLOCKWISE_ICON} height={24} width={24} alt="arrows clockwise" />
              Re-annotate
            </Outline>
            <Primary sizes={['l', 'l', 'l']} onClick={goForward}>
              + Get Hashtag
            </Primary>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Step2)
