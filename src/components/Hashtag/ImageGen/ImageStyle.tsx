import React, { useCallback } from 'react'
import { useRemoteStringConfig } from '@hooks/useRemoteConfig'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { getImageStyle } from '@services/HashtagHelper'

const IMAGE_STYLE_KEY = 'IMAGE_STYLE'
export interface ImageStyleProps {
  [key: string]: ImageStyleType
}

type ImageStyleType = {
  label: string
  value: string
  image: string
}

const ImageStyle = () => {
  const { config: imageStyles } = useRemoteStringConfig<ImageStyleProps>(IMAGE_STYLE_KEY)
  const { updateImageConfig, isLoading, imageConfig } = useHashtagToImage()
  const imageStyleOptions = getImageStyle(imageStyles)

  const imageConfigSelect = useCallback(
    (key: string, value: string) => {
      updateImageConfig({ [key]: value })
    },
    [updateImageConfig]
  )

  const updateImageStyle = useCallback(
    (value: string) => {
      // map with the value and return the key
      const mappedValue = Object.keys(imageStyles).find((key) => {
        return imageStyles[key].value === value
      })
      imageConfigSelect('imageStyle', mappedValue || imageStyleOptions[0].value)
    },
    [imageConfigSelect, imageStyleOptions, imageStyles]
  )

  if (!imageStyleOptions) return null

  return (
    <div className="grid h-auto w-full gap-4">
      <Dropdown
        options={imageStyleOptions}
        onValueChange={(key) => updateImageStyle(key.toString())}
        dropDownSizes={['m', 'm', 'm']}
        name={imageConfig.imageStyle}
        isFloating={true}
        disabled={isLoading}
        className="w-full"
      />
    </div>
  )
}

export default ImageStyle
