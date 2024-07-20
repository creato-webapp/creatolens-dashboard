import { useCallback, useEffect, useMemo, useState } from 'react'

import Image from 'next/image'

import Outline from '@components/Button/Outline'
import Primary from '@components/Button/Primary'
import DropdownCheckbox from '@components/Form/DropdownCheckbox'
import { getImageHashtag } from '@services/HashtagHelper'
import { useImageHashtagContext } from '@context/ImageToHashtagContext'
import { IHashet } from 'pages/recommendation'

const Step3 = () => {
  const { images, currentImageIndex, updateSelectedLabels, hashtags, updateHashtag, goBack } = useImageHashtagContext()
  const [options, setOptions] = useState<
    {
      name: string
      options: {
        label: string
        value: string
        checked: boolean
      }[]
    }[]
  >()

  const categorizedOptions = useMemo(() => {
    const highConfidence = hashtags.filter((hashtag) => hashtag.acc > 0.9)
    const mediumConfidence = hashtags.filter((hashtag) => hashtag.acc > 0.8 && hashtag.acc <= 0.9)
    const lowConfidence = hashtags.filter((hashtag) => hashtag.acc <= 0.8)

    const options = [
      {
        name: 'Greater Than 90% Related',
        options: highConfidence.map((hashtag) => ({
          label: hashtag.hashtag,
          value: hashtag.hashtag,
          checked: false,
        })),
      },
      {
        name: '80-90% Related',
        options: mediumConfidence.map((hashtag) => ({
          label: hashtag.hashtag,
          value: hashtag.hashtag,
          checked: false,
        })),
      },
      {
        name: 'Less Than 80% Related',
        options: lowConfidence.map((hashtag) => ({
          label: hashtag.hashtag,
          value: hashtag.hashtag,
          checked: false,
        })),
      },
    ]
    return options.filter((category) => category.options.length > 0)
  }, [hashtags])

  useEffect(() => {
    setOptions(categorizedOptions)
  }, [categorizedOptions])

  useEffect(() => {
    const fetchHashtags = async () => {
      if (images[currentImageIndex] && images[currentImageIndex].selectedLabels) {
        try {
          const res = await getImageHashtag(images[currentImageIndex].selectedLabels.join(', '))
          const hashtagsArray: IHashet[] = res.data
          updateHashtag(hashtagsArray)
        } catch (error) {
          console.error('Error fetching hashtags:', error)
        }
      }
    }

    fetchHashtags()
  }, [currentImageIndex, updateHashtag])

  const onClickSelectAll = useCallback(() => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        options: option.options.map((opt) => ({ ...opt, checked: true })),
      }))
    )
  }, [])

  const onClickHashtag = useCallback((value: string | number) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        options: option.options.map((opt) => (opt.value === value ? { ...opt, checked: !opt.checked } : opt)),
      }))
    )
  }, [])

  const onClickLabel = useCallback((value: string) => {
    updateSelectedLabels(value)
  }, [])

  const onClickClearAll = useCallback(() => {
    setOptions((prevOptions) =>
      prevOptions.map((option) => ({
        ...option,
        options: option.options.map((opt) => ({ ...opt, checked: false })),
      }))
    )
  }, [options])

  const onClickCopySelected = useCallback(() => {
    const selected = options?.flatMap((option) => option.options.filter((opt) => opt.checked).map((opt) => `${opt.label}`))
    navigator.clipboard.writeText(selected!.join(', '))
  }, [options])

  const currentImage = useMemo(() => {
    return images[currentImageIndex]
  }, [images, currentImageIndex])

  const labelOptions = useMemo(() => {
    if (!currentImage || !currentImage.labels || currentImage.labels.length === 0) return null

    return currentImage.labels.map((label) => ({
      value: label,
      label,
      checked: currentImage.selectedLabels.includes(label),
    }))
  }, [currentImage?.labels, currentImage?.selectedLabels])

  const hashtagsLength = useMemo(() => {
    if (!options) return 0
    return options.reduce((acc, option) => acc + option.options.length, 0)
  }, [options])

  return (
    <div>
      <h2 className="flex flex-row items-center font-extrabold">
        <div className="required relative h-6 w-6 cursor-pointer items-center justify-center px-4 text-center text-2xl text-black" onClick={goBack}>
          <Image src={'/back.svg'} fill alt={'back'} />
        </div>
        <h2 className="flex items-center font-extrabold"> Get hashtag recommendation</h2>
      </h2>

      <div className="relative my-4 flex aspect-square h-48  min-w-full items-center rounded-full md:min-w-fit md:justify-center">
        {currentImage?.image && (
          <Image
            fill={true}
            src={currentImage.image}
            objectFit="cover"
            className="w-fit rounded-4xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="testing"
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {labelOptions && labelOptions?.length > 0 && (
          <DropdownCheckbox
            dropDownSizes={['l', 'l', 'l']}
            key={`${'label'}-dropdown`}
            name={'Label'}
            options={labelOptions}
            onValueChange={(val) => onClickLabel(val as string)}
          />
        )}
      </div>
      <div className="my-4 border-b md:hidden"></div>
      <h3 className="my-4 text-text-secondary">{`${hashtagsLength} hashtags discovered`}</h3>
      <div>
        {options &&
          options.map((option) => {
            return (
              <div key={`${option.name}-dropdown`} className="my-4">
                <DropdownCheckbox dropDownSizes={['l', 'l', 'l']} name={option.name} options={option.options} onValueChange={onClickHashtag} />
              </div>
            )
          })}
      </div>
      <div className="my-4 flex w-full flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3">
          <Outline onClick={onClickClearAll} sizes={['m', 'l', 'l']}>
            Clear All
          </Outline>
          <Primary onClick={onClickCopySelected} sizes={['m', 'l', 'l']}>
            Copy Selected
          </Primary>
          <Primary onClick={onClickSelectAll} sizes={['m', 'l', 'l']}>
            Select All
          </Primary>
        </div>
        <Primary
          sizes={['l', 'l', 'l']}
          className="w-full"
          onClick={async () => {
            //   if (!currentImage.labels) return null
            //   const res = await getImageHashtag(currentImage.labels.join(', '))
            // updateHashtag(
            //   res.data.map((item) => {
            //     return {
            //       hashtag: item.hashtag,
            //       acc: item.acc,
            //     }
            //   })
            // )
          }}
        >
          + Generate Image
        </Primary>
        <Outline sizes={['l', 'l', 'l']} className="w-full">
          Restart
        </Outline>
      </div>
    </div>
  )
}

export default Step3
