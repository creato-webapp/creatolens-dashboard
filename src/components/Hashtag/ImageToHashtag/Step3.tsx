import { useCallback, useMemo, useState } from 'react'

import Image from 'next/image'

import Outline from '@components/Button/Outline'
import Primary from '@components/Button/Primary'
import DropdownCheckbox from '@components/Form/DropdownCheckbox'
import { getHashtag } from '@services/HashtagHelper'
import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'

const Step3 = () => {
  const { images, currentImageIndex, updateSelectedLabels } = useImageHashtagContext()

  const dropdownOptions = [
    {
      name: 'Larget Than 90% Related',
      options: [
        {
          label: '123',
          value: 123,
          checked: false,
        },
        {
          label: '124',
          value: 124,
          checked: false,
        },
        {
          label: '125',
          value: 125,
          checked: false,
        },
        {
          label: '126',
          value: 126,
          checked: false,
        },
      ],
    },
  ]
  const [options, setOptions] = useState(dropdownOptions)

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
  }, [])

  const onClickCopySelected = useCallback(() => {
    const selected = options.flatMap((option) => option.options.filter((opt) => opt.checked).map((opt) => opt.label))
    navigator.clipboard.writeText(selected.join(', '))
  }, [options])

  const currentImage = useMemo(() => {
    return images[currentImageIndex]
  }, [images, currentImageIndex])

  const labelOptions = useMemo(() => {
    if (!currentImage.labels || currentImage.labels.length === 0) return null

    return currentImage.labels.map((label) => ({
      value: label,
      label,
      checked: currentImage.selectedLabels.includes(label),
    }))
  }, [currentImage.labels, currentImage.selectedLabels])

  return (
    <div>
      <h2 className="font-extrabold">Get hashtag recommendation</h2>
      <div className="relative my-4 h-56 w-full">
        {images[currentImageIndex] && images[currentImageIndex].image && (
          <Image
            fill={true}
            src={images[currentImageIndex].image as string}
            objectFit="contain"
            className="rounded-3xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="testing"
          />
        )}
      </div>

      <div className="flex flex-col gap-4">
        {labelOptions && labelOptions?.length > 0 && (
          <DropdownCheckbox key={`${'label'}-dropdown`} name={'Label'} options={labelOptions} onValueChange={(val) => onClickLabel(val as string)} />
        )}
        {options.map((option) => {
          return <DropdownCheckbox key={`${option.name}-dropdown`} name={option.name} options={option.options} onValueChange={onClickHashtag} />
        })}
      </div>
      <div className="my-4 flex flex-col gap-4">
        <div className="flex flex-row flex-wrap gap-4">
          <Outline onClick={onClickClearAll} sizes={['l', 'l', 'l']}>
            Clear All
          </Outline>
          <Primary onClick={onClickCopySelected} sizes={['l', 'l', 'l']}>
            Copy Selected
          </Primary>
          <Primary onClick={onClickSelectAll} sizes={['l', 'l', 'l']}>
            Select All
          </Primary>
        </div>
        <Primary
          sizes={['l', 'l', 'l']}
          className="w-full"
          onClick={async () => {
            if (!currentImage.labels) return null
            await getHashtag(currentImage.labels.join(', '))
          }}
        >
          + Use Result to Generate Image
        </Primary>
      </div>
    </div>
  )
}

export default Step3
