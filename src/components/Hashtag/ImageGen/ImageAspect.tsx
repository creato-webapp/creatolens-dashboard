import Dropdown from '@components/Form/Dropdown/Dropdown'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { useRemoteStringConfig } from '@hooks/useRemoteConfig'
import { getAspectImage } from '@services/HashtagHelper'
import { useCallback } from 'react'

export type ImageAspectRatioListType = {
  [key: string]: ImageAspectRatioType
}

type ImageAspectRatioType = {
  label: string
  value: string
  width: number
  height: number
}

const IMAGE_ASPECT_KEY = 'IMAGE_ASPECT_RATIOS'

const ImageAspectSelector = () => {
  const { config: imageAspectRatios } = useRemoteStringConfig<ImageAspectRatioListType>(IMAGE_ASPECT_KEY)
  const { updateImageConfig, isLoading, imageConfig } = useHashtagToImage()
  const options = getAspectImage(imageAspectRatios)

  const imageConfigSelect = useCallback(
    (key: string, value: string) => {
      updateImageConfig({ [key]: value })
    },
    [updateImageConfig]
  )

  const updateImageAspect = useCallback(
    (aspectRatio: string) => {
      imageConfigSelect('aspectRatio', aspectRatio)
    },
    [imageConfigSelect]
  )

  if (!imageAspectRatios) return null

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Dropdown
          options={options}
          onValueChange={(key) => updateImageAspect(key.toString())}
          dropDownSizes={['m', 'm', 'm']}
          name={imageConfig.aspectRatio}
          isFloating
          disabled={isLoading}
          className="w-[300px]"
        />
      </div>
    </div>
  )
}

export default ImageAspectSelector
