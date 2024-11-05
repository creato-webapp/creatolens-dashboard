import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import Primary from '@components/Button/Primary'
import { getImageHashtag } from '@services/HashtagHelper'
import { useImageHashtagContext } from '@hooks/UseImagetoHashtag'
import { IHashet } from 'pages/recommendation'
import { CONFIDENCE_LEVELS } from '@constants/imageStyle'
import { useDialogues } from '@hooks/useDialogues'
import { Status } from '@context/DialogueContext'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/Tabs'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import CaretLeftIcon from '@components/Icon/CaretLeftIcon'
import CopyIcon from '@components/Icon/CopyIcon'
import RepeatIcon from '@components/Icon/RepeatIcon'
import PrimaryButton from '@components/Button/Primary'

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

    const categorized = Object.entries(CONFIDENCE_LEVELS)
      .map(([, level]) => ({
        name: level.name,
        options: categorizeHashtags(hashtags, {
          filter: (h) => {
            if (level.threshold) return h.acc > level.threshold
            if (level.thresholdLow && level.thresholdHigh) return h.acc > level.thresholdLow && h.acc <= level.thresholdHigh
            return false
          },
        }),
      }))
      .filter((category) => category.options.length > 0)

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

  const onClickHashtag = useCallback(
    (value: string | number) => updateOptions((opt) => (opt.value === value ? { ...opt, checked: !opt.checked } : opt)),
    [updateOptions]
  )
  const onClickLabel = useCallback(
    (value: string | number) => {
      updateSelectedLabels(value as string)
    },
    [updateSelectedLabels]
  )

  const onClickCopySelected = useCallback(() => {
    const selected = categorizedOptions.flatMap((option) => option.options.filter((opt) => opt.checked).map((opt) => opt.label))
    navigator.clipboard.writeText(selected.join(' '))
    addDialogue('Copied Successfully', Status.SUCCESS)
  }, [addDialogue, categorizedOptions])

  // const generateImageByHashtag = useCallback(async () => {
  //   if (categorizedOptions) {
  //     try {
  //       const checkedOptions = categorizedOptions.flatMap((option) =>
  //         option.options.filter((opt) => opt.checked).map((opt) => opt.label.replace(/#/g, '_'))
  //       )
  //       if (checkedOptions.length > 0) {
  //         router.push(`/hashtag/hashtag-to-image?hashtags=${checkedOptions.join(', ')}`)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching hashtags:', error)
  //     }
  //   }
  // }, [categorizedOptions])

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
      <div className="w-full md:flex md:flex-row">
        <div className="flex flex-col md:w-1/2">
          <div className="required relative flex cursor-pointer flex-row items-center gap-4" onClick={goBack}>
            <CaretLeftIcon size={20} />
            <div className="flex">Hashtags Recommendation</div>
          </div>
          <div className="relative my-4 min-h-96 w-full  ">
            {currentImage?.image && (
              <Image
                fill
                src={currentImage.image}
                objectFit="contain"
                className="w-full rounded-4xl"
                // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="image uploaded"
              />
            )}
          </div>
        </div>

        <Tabs defaultValue="hashtags" className="md:w-1/2">
          <TabsList>
            <TabsTrigger className="w-full" value="hashtags">
              Hashtags
            </TabsTrigger>
            <TabsTrigger className="w-full" value="labels">
              Labels
            </TabsTrigger>
          </TabsList>
          <TabsContent value="hashtags">
            <div className="rounded-lg py-4">
              <h3 className="my-4 text-text-secondary">{`${hashtagsLength} hashtags discovered`}</h3>
              {categorizedOptions.map((option) => (
                <div key={`${option.name}-dropdown`} className="my-4">
                  <Dropdown dropDownSizes={['l', 'l', 'l']} name={option.name} options={option.options} onValueChange={onClickHashtag} isCheckbox />
                </div>
              ))}
              <div className="flex w-full items-center justify-center py-8">
                <PrimaryButton sizes={['l', 'l', 'l']} onClick={onClickCopySelected}>
                  <CopyIcon />
                  Copy Selected
                </PrimaryButton>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="labels">
            {labelOptions && (
              <div className="flex flex-col gap-4">
                <Dropdown
                  dropDownSizes={['l', 'l', 'l']}
                  key="label-dropdown"
                  name="Label"
                  options={labelOptions}
                  onValueChange={onClickLabel}
                  isCheckbox
                />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-16 flex w-full justify-center">
        <Primary sizes={['m', 'm', 'm']} className="!w-80">
          <RepeatIcon />
          <div className="text-base">Restart</div>
        </Primary>
      </div>
    </div>
  )
}

export default React.memo(Step3)
