import React, { useCallback } from 'react'
import { useRemoteStringConfig } from '@hooks/useRemoteConfig'
import Dropdown from '@components/Form/Dropdown/Dropdown'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { useTranslation } from 'next-i18next'

const IMAGE_STYLE_KEY = 'IMAGE_STYLE'

const ImageStyle = () => {
  const { t } = useTranslation(['common'])

  const { config: imageStyles } = useRemoteStringConfig<Record<string, { value: string; image: string; name: string }>>(IMAGE_STYLE_KEY)
  const { updateImageConfig, isLoading } = useHashtagToImage()

  const imageConfigSelect = useCallback(
    (key: string, value: string) => {
      updateImageConfig({ [key]: value })
    },
    [updateImageConfig]
  )

  const updateImageStyle = useCallback(
    (value: string) => {
      const mappedValue = Object.values(imageStyles).find((style) => style.name === value)?.value || value
      imageConfigSelect('imageStyle', mappedValue)
    },
    [imageConfigSelect]
  )

  if (!imageStyles) return null

  const options = Object.entries(imageStyles).map(([key, value]) => ({ key, value: value.name, label: value.name }))

  return (
    <div className="grid h-auto gap-4">
      <Dropdown
        options={options}
        onValueChange={(key) => updateImageStyle(key.toString())}
        dropDownSizes={['m', 'm', 'm']}
        name={t('please_select')}
        isFloating={true}
        disabled={isLoading}
      />
    </div>
  )
}

export default ImageStyle
