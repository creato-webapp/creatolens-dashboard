import React from 'react'
import Image from 'next/image'
import { useRemoteStringConfig } from '@hooks/useRemoteConfig'
import { ImageStyleKeys } from '@constants/imageStyle'

interface ImageStyleProps {
  imageConfigStyles: ImageStyleKeys
  imageConfigSelect: (key: string, value: string) => void
}

const IMAGE_STYLE_KEY = 'IMAGE_STYLE'

const ImageStyle = ({ imageConfigStyles, imageConfigSelect }: ImageStyleProps) => {
  const { config: imageStyles } = useRemoteStringConfig<Record<string, { value: string; image: string; name: string }>>(IMAGE_STYLE_KEY)

  if (!imageStyles) return null

  return (
    <div className="grid h-auto grid-cols-2 gap-4 md:grid-cols-4">
      {Object.entries(imageStyles).map(([key, value]) => (
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
      ))}
    </div>
  )
}

export default ImageStyle
