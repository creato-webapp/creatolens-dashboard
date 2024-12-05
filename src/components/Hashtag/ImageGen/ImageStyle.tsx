import React from 'react'
import { useRemoteStringConfig } from '@hooks/useRemoteConfig'
import Dropdown from '@components/Form/Dropdown/Dropdown'

const IMAGE_STYLE_KEY = 'IMAGE_STYLE'

const ImageStyle = () => {
  const { config: imageStyles } = useRemoteStringConfig<Record<string, { value: string; image: string; name: string }>>(IMAGE_STYLE_KEY)

  if (!imageStyles) return null

  const options = Object.entries(imageStyles).map(([key, value]) => ({ key, value: value.name, label: value.name }))

  return (
    <div className="grid h-auto gap-4">
      <Dropdown options={options} dropDownSizes={['m', 'm', 'm']} name="Please Select" isFloating={true} />
      {/* {Object.entries(imageStyles).map(([key, value]) => (
        <div
          key={key}
          onClick={() => imageConfigSelect('imageStyle', value.value)}
          className="flex aspect-square cursor-pointer flex-col items-center rounded-xl"
        >
          <div className={`relative h-full w-full ${imageConfigStyles === value.value ? 'rounded-xl ring-2 ring-accent1-500' : ''}`}>
            <Image className="rounded-xl" src={value.image} alt={value.name} fill />
          </div>
          <h3 className={`text-center font-bold ${imageConfigStyles === value.value ? 'text-accent1-500' : ''}`}>{value.name}</h3>
        </div>
      ))} */}
    </div>
  )
}

export default ImageStyle
