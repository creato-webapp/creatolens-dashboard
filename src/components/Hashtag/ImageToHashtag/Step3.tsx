import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'

import Primary from '@components/Button/Primary'
import { getImageHashtag } from '@services/HashtagHelper'
import { useImageHashtag } from '@hooks/useImagetoHashtag'
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
import Neutral from '@components/Button/Neutral'

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
  const { image, updateSelectedLabels, hashtags, updateHashtag, goBack, clearImage } = useImageHashtag()
  const { addDialogue } = useDialogues()

  const currentImage = useMemo(() => image, [image])

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
    (value: string | number) => {
      updateOptions((opt) => {
        if (opt.value === value) {
          return { ...opt, checked: !opt.checked }
        }
        return opt
      })
    },
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

  const onClickCopySelectedLabels = useCallback(() => {
    const selectedLabels = currentImage?.selectedLabels.join(' ')
    navigator.clipboard.writeText(selectedLabels)
    addDialogue('Labels Copied Successfully', Status.SUCCESS)
  }, [currentImage?.selectedLabels, addDialogue])

  const onClickClearSelected = useCallback(() => {
    setCategorizedOptions((prevOptions) =>
      prevOptions.map((category) => ({
        ...category,
        options: category.options.map((opt) => ({ ...opt, checked: false })),
      }))
    )
  }, [])

  const labelOptions = useMemo(() => {
    if (!currentImage?.labels) return null
    return currentImage.labels.map((label) => ({
      value: label,
      label,
      checked: currentImage.selectedLabels.includes(label),
    }))
  }, [currentImage?.labels, currentImage?.selectedLabels])

  const hashtagsLength = useMemo(() => categorizedOptions.reduce((acc, option) => acc + option.options.length, 0), [categorizedOptions])

  const checkedLabelsLength = useMemo(() => (labelOptions ? labelOptions.filter((label) => label.checked).length : 0), [labelOptions])

  const totalChecked = useMemo(
    () => categorizedOptions.reduce((acc, option) => acc + option.options.filter((opt) => opt.checked).length, 0),
    [categorizedOptions]
  )
  return (
    <div>
      <div className="w-full md:flex md:flex-row md:gap-4">
        <div className="flex flex-col md:w-1/2">
          <div className="required relative flex cursor-pointer flex-row items-center gap-4" onClick={goBack}>
            <CaretLeftIcon size={20} />
            <div className="flex">Hashtags Recommendation</div>
          </div>
          <div className="relative my-4 min-h-96 w-full ">
            {currentImage?.image && (
              <Image
                fill
                src={currentImage.image}
                style={{ objectFit: 'contain' }}
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
              <div className="flex w-full justify-around gap-12 py-8">
                <Neutral sizes={['l', 'l', 'l']} onClick={onClickClearSelected}>
                  Clear All
                </Neutral>
                <PrimaryButton sizes={['l', 'l', 'l']} onClick={onClickCopySelected} disabled={totalChecked === 0}>
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
            <div className="pt-12">
              <PrimaryButton sizes={['l', 'l', 'l']} onClick={onClickCopySelectedLabels} disabled={checkedLabelsLength === 0}>
                <CopyIcon />
                Copy Selected
              </PrimaryButton>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      <div className="mt-4 flex w-full justify-center md:mt-16">
        <Primary sizes={['m', 'm', 'm']} className="w-full md:!w-80" onClick={clearImage}>
          <RepeatIcon />
          <div className="text-base">Restart</div>
        </Primary>
      </div>
      <div className="mt-16 text-start text-sm text-neutral-500">
        Please note: This tool may display offensive material that doesn&apos;t represent 2 Tag&apos;s views. You&apos;re solely responsible for use
        of any content generated using this tool, including its compliance with applicable laws and third-party rights.
      </div>
    </div>
  )
}

export default React.memo(Step3)
