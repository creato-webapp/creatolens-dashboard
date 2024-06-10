import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import Primary from '@components/Button/PrimaryButton'
import Outline from '@components/Button/OutlineButton'
import DropdownCheckbox from '@components/Form/DropdownCheckbox'

const Step3 = () => {
  const { images, currentImage } = useImageHashtagContext()
  const [imageURL, setImageURL] = useState<string | null>(null)

  const dropdownOptions = [
    {
      name: 'Label',
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

  useEffect(() => {
    const currentImageObj = images[currentImage - 1]
    if (currentImageObj) {
      if (currentImageObj.image instanceof Blob) {
        const url = URL.createObjectURL(currentImageObj.image)
        setImageURL(url)
        // Cleanup function to revoke the object URL
        return () => URL.revokeObjectURL(url)
      } else if (typeof currentImageObj.image === 'string') {
        setImageURL(currentImageObj.image)
      }
    }
  }, [images, currentImage])

  return (
    <div>
      <div>Get hashtag recommendation</div>
      <div className="relative my-4 h-56 w-full">
        {imageURL && (
          <Image
            fill={true}
            src={imageURL}
            objectFit="contain"
            className="rounded-3xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="testing"
          />
        )}
      </div>
      <div className="flex flex-col gap-4">
        {options.map((option) => {
          return <DropdownCheckbox key={`${option.name}-dropdown`} name={option.name} options={option.options} onValueChange={onClickHashtag} />
        })}
      </div>
      <div className="my-4 flex flex-col gap-4">
        <div className="flex flex-row gap-4">
          <Outline onClick={onClickClearAll} sizes={['full', 'full', 'full']}>
            Clear All
          </Outline>
          <Primary onClick={onClickCopySelected} sizes={['full', 'full', 'full']}>
            Copy Selected
          </Primary>
          <Primary onClick={onClickSelectAll} sizes={['full', 'full', 'full']}>
            Select All
          </Primary>
        </div>
        <Primary sizes={['full', 'full', 'full']} className="w-full">
          + Use Result to Generate Image
        </Primary>
      </div>
    </div>
  )
}

export default Step3
