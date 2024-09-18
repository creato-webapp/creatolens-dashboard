import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import Outline from '@components/Button/Outline'
import Primary from '@components/Button/Primary'
import DropdownCheckbox from '@components/Form/DropdownCheckbox'
import { getImageHashtag } from '@services/HashtagHelper'
import { useImageHashtagContext } from '@hooks/UseImagetoHashtag'
import { IHashet } from 'pages/recommendation'
import router from 'next/router'
import { CONFIDENCE_LEVELS } from '@constants/imageStyle'
import { useDialogues } from '@hooks/useDialogues'
import { Status } from '@context/DialogueContext'

interface Option {
  label: string
  value: string
  checked: boolean
}

interface CategoryOption {
  name: string
  options: Option[]
}

const Step3: React.FC = () => {
  const { images, currentImageIndex, updateSelectedLabels, hashtags, updateHashtag, goBack } = useImageHashtagContext()
  const { addDialogue } = useDialogues()

  const currentImage = useMemo(() => images[currentImageIndex], [images, currentImageIndex])

  const [categorizedOptions, setCategorizedOptions] = useState<CategoryOption[]>([])

  useEffect(() => {
    if (!hashtags) return

    const categorizeHashtags = (hashtags: IHashet[], confidenceLevel: { filter: (h: IHashet) => boolean }) =>
      hashtags.filter(confidenceLevel.filter).map((hashtag) => ({
        label: hashtag.hashtag,
        value: hashtag.hashtag,
        checked: false,
      }))

    const categorized = [
      {
        name: CONFIDENCE_LEVELS.HIGH.name,
        options: categorizeHashtags(hashtags, { filter: (h) => h.acc > CONFIDENCE_LEVELS.HIGH.threshold! }),
      },
      {
        name: CONFIDENCE_LEVELS.MEDIUM.name,
        options: categorizeHashtags(hashtags, {
          filter: (h) => h.acc > CONFIDENCE_LEVELS.MEDIUM.thresholdLow! && h.acc <= CONFIDENCE_LEVELS.MEDIUM.thresholdHigh!,
        }),
      },
      {
        name: CONFIDENCE_LEVELS.LOW.name,
        options: categorizeHashtags(hashtags, { filter: (h) => h.acc <= CONFIDENCE_LEVELS.LOW.threshold! }),
      },
    ].filter((category) => category.options.length > 0)

    setCategorizedOptions(categorized)
  }, [hashtags])

  const fetchHashtags = useCallback(async () => {
    if (currentImage?.selectedLabels) {
      try {
        const res = await getImageHashtag(currentImage.selectedLabels.join(', '))
        updateHashtag(res.data)
      } catch (error) {
        console.error('Error fetching hashtags:', error)
      }
    }
  }, [currentImage?.selectedLabels, updateHashtag])

  useEffect(() => {
    fetchHashtags()
  }, [])

  const updateOptions = useCallback((updateFn: (opt: Option) => Option) => {
    setCategorizedOptions((prevOptions) =>
      prevOptions.map((category) => ({
        ...category,
        options: category.options.map(updateFn),
      }))
    )
  }, [])

  const onClickSelectAll = useCallback(() => updateOptions((opt) => ({ ...opt, checked: true })), [updateOptions])
  const onClickHashtag = useCallback(
    (value: string | number) => updateOptions((opt) => (opt.value === value ? { ...opt, checked: !opt.checked } : opt)),
    [updateOptions]
  )
  const onClickLabel = useCallback((value: string | number) => updateSelectedLabels(value as string), [updateSelectedLabels])
  const onClickClearAll = useCallback(() => updateOptions((opt) => ({ ...opt, checked: false })), [updateOptions])

  const onClickCopySelected = useCallback(() => {
    const selected = categorizedOptions.flatMap((option) => option.options.filter((opt) => opt.checked).map((opt) => opt.label))
    navigator.clipboard.writeText(selected.join(', '))
    addDialogue('Copied Successfully', Status.SUCCESS)
  }, [addDialogue, categorizedOptions])

  const generateImageByHashtag = useCallback(async () => {
    if (categorizedOptions) {
      try {
        const checkedOptions = categorizedOptions.flatMap((option) =>
          option.options.filter((opt) => opt.checked).map((opt) => opt.label.replace(/#/g, '_'))
        )
        if (checkedOptions.length > 0) {
          router.push(`/hashtag/hashtag-to-image?hashtags=${checkedOptions.join(', ')}`)
        }
      } catch (error) {
        console.error('Error fetching hashtags:', error)
      }
    }
  }, [categorizedOptions])

  const labelOptions = useMemo(() => {
    if (!currentImage?.labels) return null
    return currentImage.labels.map((label) => ({
      value: label,
      label,
      checked: currentImage.selectedLabels.includes(label),
    }))
  }, [currentImage?.labels, currentImage?.selectedLabels])

  const hashtagsLength = useMemo(() => categorizedOptions.reduce((acc, option) => acc + option.options.length, 0), [categorizedOptions])

  return (
    <div>
      <h2 className="flex flex-row items-center font-extrabold">
        <div className="required relative h-6 w-6 cursor-pointer items-center justify-center px-4 text-center text-2xl text-black" onClick={goBack}>
          <Image src="/back.svg" fill alt="back" />
        </div>
        <span className="flex items-center font-extrabold">Get hashtag recommendation</span>
      </h2>

      {currentImage?.image && (
        <div className="relative my-4 flex aspect-square h-48 w-full items-center rounded-full md:min-w-fit md:justify-center">
          <Image
            fill
            src={currentImage.image}
            objectFit="contain"
            className="w-fit rounded-4xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="current image"
          />
        </div>
      )}

      {labelOptions && (
        <div className="flex flex-col gap-4">
          <DropdownCheckbox dropDownSizes={['l', 'l', 'l']} key="label-dropdown" name="Label" options={labelOptions} onValueChange={onClickLabel} />
        </div>
      )}

      <div className="my-4 border-b md:hidden" />
      <h3 className="my-4 text-text-secondary">{`${hashtagsLength} hashtags discovered`}</h3>

      {categorizedOptions.map((option) => (
        <div key={`${option.name}-dropdown`} className="my-4">
          <DropdownCheckbox dropDownSizes={['l', 'l', 'l']} name={option.name} options={option.options} onValueChange={onClickHashtag} />
        </div>
      ))}

      <div className="my-4 flex w-full flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3">
          <Outline onClick={onClickClearAll} sizes={['s', 'l', 'l']}>
            Clear All
          </Outline>
          <Primary onClick={onClickCopySelected} sizes={['s', 'l', 'l']}>
            Copy Selected
          </Primary>
          <Primary onClick={onClickSelectAll} sizes={['s', 'l', 'l']}>
            Select All
          </Primary>
        </div>
        <Primary sizes={['l', 'l', 'l']} className="w-full" onClick={generateImageByHashtag}>
          + Generate Image
        </Primary>
        <Outline sizes={['l', 'l', 'l']} className="w-full">
          Restart
        </Outline>
      </div>
    </div>
  )
}

export default React.memo(Step3)
