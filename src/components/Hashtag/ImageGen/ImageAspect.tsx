import Dropdown from '@components/Form/Dropdown/Dropdown'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { useRemoteStringConfig } from '@hooks/useRemoteConfig'
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation(['common'])
  const { config: imageAspectRatios } = useRemoteStringConfig<ImageAspectRatioListType>(IMAGE_ASPECT_KEY)
  const { updateImageConfig, isLoading } = useHashtagToImage()
  const options = Object.entries(imageAspectRatios).map(([key, value]) => ({ key, value: value.value, label: value.label }))

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
          name={t('please_select')}
          isFloating
          disabled={isLoading}
        />
      </div>
    </div>
  )
}

export default ImageAspectSelector
