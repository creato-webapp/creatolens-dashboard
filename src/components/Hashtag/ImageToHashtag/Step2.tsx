import React, { useEffect, useMemo, useCallback, useState } from 'react'
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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@components/ui/Dialog'
import BaseInput from '@components/Form/BaseInput'
import NeutralButton from '@components/Button/Neutral'
import CrossIcon from '@components/Icon/CrossIcon'
import CirclePlusIcon from '@components/Icon/CirclePlusIcon'

const ARROWS_CLOCKWISE_ICON = '/arrows-clockwise.png'

export function DialogCloseButton(props: { onClick: (labels: string[]) => void }) {
  const [labels, setLabels] = useState<string[]>([])
  const [input, setInput] = useState<string>('')
  const { onClick } = props

  const updateLabels = useCallback(
    (value: string) => {
      if (!labels.includes(value) || value) {
        setLabels((pre) => [...pre, value])
        setInput('')
      }
    },
    [labels]
  )

  const onClickParentFunction = () => {
    onClick(labels)
    setLabels([])
  }

  const removeLabel = useCallback((label: string) => {
    setLabels((prevLabels) => prevLabels.filter((item) => item !== label))
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex flex-row items-center">
          <SubtleButton>
            <CirclePlusIcon />
            Add Label
          </SubtleButton>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">Add Label Manually</DialogTitle>
          <DialogDescription className="py-1 text-start">Label as</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col items-center gap-4 space-x-2">
          <div className="flex w-full flex-row items-center justify-between gap-2 ">
            <BaseInput allowSpace onChange={(e) => setInput(e.target.value)} value={input} placeholder="Other, please specify" />
            <div className="cursor-pointer" onClick={() => updateLabels(input)}>
              Add
            </div>
          </div>
          <hr className="my-2 w-full border-t border-neutral-300" />
          <div className="flex w-full flex-row flex-wrap items-start gap-4">
            {labels.length > 0 &&
              labels.map((label) => {
                return (
                  <Badge key={label} className="flex flex-row gap-2 text-base leading-4">
                    {label}
                    <div onClick={() => removeLabel(label)} className="cursor-pointer">
                      <CrossIcon size={20} />
                    </div>
                  </Badge>
                )
              })}
          </div>
          <div className="flex flex-row justify-center gap-3 pt-2">
            <NeutralButton className="text-base leading-4" sizes={['m', 'm', 'm']}>
              Cancel
            </NeutralButton>
            <Primary sizes={['m', 'm', 'm']} onClick={onClickParentFunction}>
              Confirm
            </Primary>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const Step2 = () => {
  const {
    images,
    addCustomLabels,
    currentImageIndex,
    getCurrentImageLabels,
    updateSelectedLabels,
    selectAllLabels,
    loadingLabels,
    updateLabel,
    goBack,
    goForward,
  } = useImageHashtagContext()

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

    const unselectedLabels = loadingLabels ? (
      <Skeleton count={2} style={{ height: 40 }} containerClassName="flex-1" />
    ) : (
      currentImage?.labels
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
    )

    return { selectedLabels, unselectedLabels }
  }, [currentImage, loadingLabels, onClose, onSelected])

  return (
    <div className="flex w-full flex-col gap-4 md:gap-8">
      <div className="flex flex-col">
        <div className="required relative flex cursor-pointer flex-row items-center gap-4" onClick={goBack}>
          <CaretLeftIcon size={20} />
          <div className="flex">Image label annotation</div>
        </div>
        <div className="pl-9 text-sm text-neutral-500">Let AI knows what is in your image</div>
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="h-full w-full">
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
            <em className="text-neutral-500">
              Select the correct label(s) for the image. ({`${renderLabels.selectedLabels?.length}/${currentImage?.labels?.length || 0}`})
            </em>
            <div className="flex h-full w-full flex-row flex-wrap gap-4">{renderLabels.selectedLabels}</div>
          </div>
          <DialogCloseButton onClick={addCustomLabels} />
          <div>
            {currentImage?.selectedLabels.length === 0 && (
              <div className="mt-12 flex flex-col gap-4">
                <div className="flex items-center justify-center">
                  <Primary sizes={['m', 'm', 'm']} onClick={selectAllLabels} disabled={loadingLabels}>
                    Select All
                  </Primary>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        {currentImage?.selectedLabels.length !== 0 && (
          <Primary sizes={['m', 'm', 'm']} className="!w-full md:!w-96" onClick={goForward} disabled={loadingLabels}>
            Next
            <CaretRightIcon size={16} />
          </Primary>
        )}
      </div>
    </div>
  )
}

export default React.memo(Step2)
