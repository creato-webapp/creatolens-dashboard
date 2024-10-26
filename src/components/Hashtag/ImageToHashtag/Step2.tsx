import React, { useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import { Badge } from '@components/ui/Badge'

import { useImageHashtagContext } from '@hooks/UseImagetoHashtag'
import SingleCheck from '@components/Icon/SingleCheckIcon'
import CaretLeftIcon from '@components/Icon/CaretLeftIcon'
import SubtleButton from '@components/Button/Subtle'
import Primary from '@components/Button/Primary'
import CaretRightIcon from '@components/Icon/CaretRightIcon'

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
      return {
        selectedLabels: <Skeleton count={3} style={{ height: 40 }} containerClassName="flex-1" />,
        unselectedLabels: null,
      }
    }

    const selectedLabels = currentImage?.labels
      ?.filter((label) => currentImage.selectedLabels.includes(label))
      .map((label) => (
        <Badge key={`key-${label}`} className="cursor-pointer" variant={'default'} onClose={() => onClose(label)} onClick={() => onSelected(label)}>
          <div className="flex flex-row items-center gap-2">
            <SingleCheck className="h-4 w-4 stroke-white" />
            {label}
          </div>
        </Badge>
      ))

    const unselectedLabels = currentImage?.labels
      ?.filter((label) => !currentImage.selectedLabels.includes(label))
      .map((label) => (
        <Badge
          key={`key-${label}`}
          className="cursor-pointer"
          variant={'destructive'}
          onClose={() => onClose(label)}
          onClick={() => onSelected(label)}
        >
          <div className="flex flex-row items-center gap-2">{label}</div>
        </Badge>
      ))

    return { selectedLabels, unselectedLabels }
  }, [currentImage, loadingLabels, onClose, onSelected])

  return (
    <div className="flex w-full flex-col gap-4 md:flex-row">
      <div className="h-full w-full">
        <div className="flex flex-col">
          <div className="required relative flex cursor-pointer flex-row  " onClick={goBack}>
            <CaretLeftIcon />
            <div className="flex">Image label annotation</div>
          </div>
          <div className="pl-6 text-sm text-neutral-500">Let AI knows what is in your image</div>
        </div>

        <div className="relative my-4 min-h-96 w-full rounded-full">
          {currentImage?.image && (
            <Image
              fill
              src={currentImage.image}
              objectFit="contain"
              className="h-full rounded-4xl"
              // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="image uploaded"
            />
          )}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <div>{currentImage?.labels && <h3 className="text-text-secondary ">{`${currentImage.labels.length}`} labels discovered</h3>}</div>
          <SubtleButton
            sizes={['s', 's', 's']}
            onClick={onReannotateClick}
            className="items-end"
            disabled={currentImage?.selectedLabels.length === currentImage?.labels?.length}
          >
            <Image src={ARROWS_CLOCKWISE_ICON} height={24} width={24} alt="arrows clockwise" />
            Re-annotate
          </SubtleButton>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex h-full w-full flex-row flex-wrap gap-4">{renderLabels.unselectedLabels}</div>
          <em className="text-neutral-500">Select the correct label(s) for the image.</em>
          <div className="flex h-full w-full flex-row flex-wrap gap-4">{renderLabels.selectedLabels}</div>
        </div>
        <div>
          <div className="mt-12 flex flex-col gap-4">
            <div className="flex items-center justify-center">
              {currentImage?.selectedLabels.length === 0 && (
                <Primary sizes={['m', 'm', 'm']} onClick={selectAllLabels} disabled={loadingLabels}>
                  Select All
                </Primary>
              )}
            </div>
            {currentImage?.selectedLabels.length !== 0 && (
              <Primary sizes={['l', 'l', 'l']} onClick={goForward} disabled={loadingLabels}>
                Next
                <CaretRightIcon size={16} />
              </Primary>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(Step2)
