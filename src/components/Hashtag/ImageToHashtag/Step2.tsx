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
import CirclePlusLargeIcon from '@components/Icon/CirclePlusLargeIcon'

const ARROWS_CLOCKWISE_ICON = '/arrows-clockwise.png'

interface StepHeaderProps {
  onBack: () => void
  title: string
  subtitle: string
}

const StepHeader: React.FC<StepHeaderProps> = ({ onBack, title, subtitle }) => (
  <div className="flex flex-col">
    <button className="flex cursor-pointer flex-row items-center gap-4" onClick={onBack} aria-label="Go back">
      <CaretLeftIcon className="h-5 w-5" />
      <span>{title}</span>
    </button>
    <div className="pl-9 text-sm text-neutral-500">{subtitle}</div>
  </div>
)

interface AddLabelsButtonProps {
  onClick: (labels: string[]) => void
}

const AddLabelsButton: React.FC<AddLabelsButtonProps> = ({ onClick }) => {
  const [labels, setLabels] = useState<string[]>([])
  const [selectedLabels, setSelectedLabels] = useState<string[]>([])
  const [input, setInput] = useState<string>('')

  const updateLabels = useCallback(
    (value: string) => {
      if (value && !labels.includes(value)) {
        setLabels((prev) => [...prev, value])
        setInput('')
      }
    },
    [labels]
  )

  const updateSelectedLabels = useCallback(
    (label: string) => {
      if (labels.includes(label)) {
        setLabels((prevLabels) => prevLabels.filter((item) => item !== label))
        setSelectedLabels((prevSelectedLabels) => [...prevSelectedLabels, label])
      }
    },
    [labels]
  )

  const onClickParentFunction = useCallback(() => {
    onClick(selectedLabels)
    setLabels([])
    setSelectedLabels([])
  }, [onClick, selectedLabels])

  const removeLabel = useCallback((label: string) => {
    setLabels((prevLabels) => [...prevLabels, label])
    setSelectedLabels((prevSelectedLabels) => prevSelectedLabels.filter((item) => item !== label))
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
          <div className="flex w-full flex-row items-center justify-between gap-2">
            <BaseInput className="w-full" allowSpace onChange={(e) => setInput(e.target.value)} value={input} placeholder="Other, please specify" />
            <div className="cursor-pointer" onClick={() => updateLabels(input)}>
              <CirclePlusLargeIcon width={35} height={35} />
            </div>
          </div>

          <div className="flex w-full flex-row flex-wrap gap-2">
            {labels.map((label) => (
              <Badge
                key={label}
                variant={'destructive'}
                className="flex cursor-pointer text-base leading-4"
                onClick={() => updateSelectedLabels(label)}
              >
                {label}
              </Badge>
            ))}
          </div>
          <hr className="my-2 w-full border-t border-neutral-300" />
          <div className="flex w-full flex-row flex-wrap items-start gap-4">
            {selectedLabels.length > 0 &&
              selectedLabels.map((label) => (
                <Badge key={label} className="flex flex-row gap-2 text-base leading-4">
                  {label}
                  <div onClick={() => removeLabel(label)} className="cursor-pointer">
                    <CrossIcon size={20} />
                  </div>
                </Badge>
              ))}
          </div>
          <DialogClose asChild>
            <div className="flex flex-row justify-center gap-3 pt-2">
              <NeutralButton className="text-base leading-4" sizes={['m', 'm', 'm']}>
                Cancel
              </NeutralButton>
              <Primary sizes={['m', 'm', 'm']} onClick={onClickParentFunction} disabled={selectedLabels.length == 0}>
                Confirm
              </Primary>
            </div>
          </DialogClose>
        </div>
        <DialogFooter className="sm:justify-start" />
      </DialogContent>
    </Dialog>
  )
}

const Step2: React.FC = () => {
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

  const onLabelClick = useCallback(
    (label: string) => {
      updateSelectedLabels(label)
    },
    [updateSelectedLabels]
  )

  const onReannotateClick = useCallback(() => {
    if (!currentImage.labels || !currentImage.image) return
    const numberOfUnselectedLabels = currentImage.labels.length - currentImage.selectedLabels.length
    updateLabel({
      image_url: currentImage.image,
      existing_labels: currentImage.labels,
      number: numberOfUnselectedLabels,
    })
  }, [currentImage, updateLabel])

  const renderLabels = useMemo(() => {
    if (!currentImage) return { selectedLabels: null, unselectedLabels: null }

    const selectedLabels = currentImage.labels
      ?.filter((label) => currentImage.selectedLabels.includes(label))
      .map((label) => (
        <Badge key={`key-${label}`} className="cursor-pointer" variant={'default'} onClick={() => onLabelClick(label)}>
          <div className="flex flex-row items-center gap-2">
            <SingleCheck className="h-4 w-4 stroke-white" />
            {label}
          </div>
        </Badge>
      ))

    const unselectedLabels = loadingLabels ? (
      <Skeleton count={2} style={{ height: 40 }} containerClassName="flex-1" />
    ) : (
      currentImage.labels
        ?.filter((label) => !currentImage.selectedLabels.includes(label))
        .map((label) => (
          <Badge key={`key-${label}`} className="cursor-pointer" variant={'destructive'} onClick={() => onLabelClick(label)}>
            <div className="flex flex-row items-center gap-2">{label}</div>
          </Badge>
        ))
    )

    return { selectedLabels, unselectedLabels }
  }, [currentImage, loadingLabels, onLabelClick])

  return (
    <div className="flex w-full flex-col gap-4 md:gap-8">
      <StepHeader onBack={goBack} title="Image label annotation" subtitle="Let AI know what is in your image" />
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="h-full w-full">
          <div className="relative my-4 min-h-96 w-full rounded-full">
            {currentImage?.image && <Image fill src={currentImage.image} objectFit="contain" className="h-full rounded-4xl" alt="image uploaded" />}
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
            <div className="flex h-full w-full flex-row flex-wrap gap-4">
              {renderLabels.unselectedLabels}
              {!loadingLabels && <AddLabelsButton onClick={addCustomLabels} />}
              <div className="flex w-full justify-center">
                {currentImage?.selectedLabels.length === 0 && (
                  <div className="mt-4 flex flex-col gap-4">
                    <div className="flex items-center justify-center">
                      <Primary sizes={['m', 'm', 'm']} onClick={selectAllLabels} disabled={loadingLabels}>
                        Select All
                      </Primary>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <em className="text-neutral-500">Select or add the correct label(s) for the image.</em>
            <div className="flex h-full w-full flex-row flex-wrap gap-4">{renderLabels.selectedLabels}</div>
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
