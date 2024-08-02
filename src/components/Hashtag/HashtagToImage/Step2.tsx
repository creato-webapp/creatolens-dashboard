import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'

import Primary from '@components/Button/Primary'
import Dropdown from '@components/Form/DropdownV2'
import { useHashtagToImage } from '@hooks/useHashtagToImage'
import { usePromptTemplate } from '@hooks/usePromptTemplate'
import { ImageCategoryType } from '@constants/imageStyle'

const Step2 = () => {
  const { goBack, goForward, imageConfig, generateImage, updateImageConfig, updateImageCategory } = useHashtagToImage()
  const { ImageAspectRatios, ImageCategories, ImageStyles } = usePromptTemplate()

  const onClickNextStep = useCallback(() => {
    generateImage()
    goForward()
  }, [generateImage, goForward])

  const imageConfigSelect = useCallback(
    (key: string, value: string) => {
      updateImageConfig({ [key]: value })
    },
    [updateImageConfig]
  )

  const onGeneralSelected = useCallback(
    (option: keyof ImageCategoryType, value: string) => {
      updateImageCategory(option, value)
    },
    [updateImageCategory]
  )

  const AspectRatioSelection = useMemo(() => {
    if (!ImageAspectRatios) return null

    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-extrabold">Aspect ratio</h2>
        <div className="grid aspect-square w-full grid-cols-2 gap-4">
          {Object.entries(ImageAspectRatios).map(([key, value]) => (
            <div className="flex w-full flex-col items-center justify-center rounded-xl" key={key}>
              <div
                className={`flex aspect-square h-auto max-h-48 w-full max-w-48 items-center justify-center rounded-xl bg-white px-8 py-4 ${
                  imageConfig?.aspectRatio === value.value ? 'border-4 border-accent1-500' : 'border border-stroke'
                }`}
                onClick={() => imageConfigSelect('aspectRatio', value.value)}
              >
                <div
                  className="bg-[#D9D9D9] shadow-2xl"
                  style={{
                    aspectRatio: `${value.width} / ${value.height}`,
                    width: `${value.width === 9 && value.height === 16 ? '70%' : '100%'}`,
                  }}
                />
              </div>
              <div>{value.label}</div>
            </div>
          ))}
        </div>
      </div>
    )
  }, [ImageAspectRatios, imageConfig?.aspectRatio, imageConfigSelect])

  const ImageCategorySelection = useMemo(() => {
    if (!ImageCategories) return null

    return (
      <div>
        <h2>General</h2>
        <div className="flex flex-col gap-4">
          {Object.entries(ImageCategories).map(
            ([key, value]) =>
              value.templateType.includes(imageConfig.imageStyle) && (
                <Dropdown
                  name={value.label}
                  dropDownSizes={['m', 'm', 'm']}
                  key={key}
                  options={value.options.map((option) => ({ label: option.label, value: option.value }))}
                  onValueChange={(selectedValue) => onGeneralSelected(value.key, selectedValue as string)}
                />
              )
          )}
        </div>
      </div>
    )
  }, [ImageCategories, imageConfig.imageStyle, onGeneralSelected])

  const ImageStyleSelection = useMemo(() => {
    if (!ImageStyles) return null

    return (
      <div className="grid h-auto grid-cols-2 gap-4 md:grid-cols-4">
        {Object.entries(ImageStyles).map(([key, value]) => (
          <div
            key={key}
            onClick={() => imageConfigSelect('imageStyle', value.value)}
            className="flex aspect-square cursor-pointer flex-col items-center rounded-xl"
          >
            <div className={`relative h-full w-full ${imageConfig.imageStyle === value.value ? 'rounded-xl ring-2 ring-accent1-500' : ''}`}>
              <Image src={value.image} alt={value.name} fill />
            </div>
            <h3 className={`text-center font-bold ${imageConfig.imageStyle === value.value ? 'text-accent1-500' : ''}`}>{value.name}</h3>
          </div>
        ))}
      </div>
    )
  }, [ImageStyles, imageConfig.imageStyle, imageConfigSelect])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center">
          <div className="required relative h-6 w-6 cursor-pointer items-center justify-center px-4 text-center text-2xl text-black" onClick={goBack}>
            <Image src="/back.svg" fill alt="back" />
          </div>
          <h2 className="h2 font-extrabold">Format</h2>
        </div>
        {ImageStyleSelection}
      </div>
      {AspectRatioSelection}
      {ImageCategorySelection}
      <div className="mt-4 flex w-full items-center justify-center">
        <Primary onClick={onClickNextStep} sizes={['l', 'l', 'l']}>
          Generate Image
        </Primary>
      </div>
    </div>
  )
}

export default React.memo(Step2)
