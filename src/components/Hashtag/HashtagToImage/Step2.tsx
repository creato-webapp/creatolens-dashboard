import React, { useCallback } from 'react'
import Image from 'next/image'

import Primary from '@components/Button/Primary'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import ImageAspectSelector from '../ImageGen/ImageAspect'
import ImageCategory from '../ImageGen/ImageCategory'
import ImageStyle from '../ImageGen/ImageStyle'

const Step2 = () => {
  const { goBack, goForward, imageConfig, generateImageWithKeywords, updateImageConfig, updateImageCategory } = useHashtagToImage()

  const onClickNextStep = useCallback(() => {
    generateImageWithKeywords()
    goForward()
  }, [generateImageWithKeywords, goForward])

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

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center">
          <div className="required relative h-6 w-6 cursor-pointer items-center justify-center px-4 text-center text-2xl text-black" onClick={goBack}>
            <Image src="/back.svg" fill alt="back" />
          </div>
          <h2 className="h2 font-extrabold">Format</h2>
        </div>
        <ImageStyle imageConfigStyles={imageConfig.imageStyle} imageConfigSelect={imageConfigSelect} />
      </div>
      <ImageAspectSelector aspectRatio={imageConfig.aspectRatio} setAspectRatio={updateImageAspect} />
      <ImageCategory imageConfigStyles={imageConfig.imageStyle} setCategories={updateImageCategory} />
      <div className="mt-4 flex w-full items-center justify-center">
        <Primary onClick={onClickNextStep} sizes={['l', 'l', 'l']}>
          Generate Image
        </Primary>
      </div>
    </div>
  )
}

export default React.memo(Step2)
