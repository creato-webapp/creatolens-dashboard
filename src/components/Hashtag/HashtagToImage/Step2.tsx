import React from 'react'
import { useCallback } from 'react'

import Image from 'next/image'

import Primary from '@components/Button/Primary'
import { DropdownOption } from '@components/Form/Dropdown'
import Dropdown from '@components/Form/DropdownV2'
import { RadioGroup } from '@components/Form/Radio/Group'
import { useHashtagImageContext } from 'src/context/HashtagToImageContext'

import {
  IMAGE_ASPECT_RATIOS,
  IMAGE_CATEGORY,
  IMAGE_STYLE,
  IMAGE_USAGE,
  ImageCategoryType,
  SOCIAL_MEDIA_PLATFORMS,
} from '../../../constants/imageStyle'

const Step2 = () => {
  const { goBack, imageConfig, generateImage, updateImageConfig, updateImageCategory } = useHashtagImageContext()

  const onClickNextStep = () => {
    generateImage()
    // goForward()
    return
  }

  const imageConfigSelect = useCallback(
    (key: string, value: string) => {
      updateImageConfig({
        [key]: value,
      })
    },
    [updateImageConfig]
  )

  const usageSelect = useCallback(
    (value: string) => {
      updateImageConfig({
        usage: {
          platform: imageConfig.usage.platform,
          name: value,
        },
      })
    },
    [imageConfig.usage.platform, updateImageConfig]
  )

  const platformSelect = useCallback(
    (value: string) => {
      updateImageConfig({
        usage: {
          platform: value,
          name: imageConfig.usage.name,
        },
      })
    },
    [imageConfig.usage.name, updateImageConfig]
  )

  const onGeneralSelected = useCallback(
    (option: keyof ImageCategoryType, value: string | number) => {
      updateImageCategory(option, value)
    },
    [updateImageCategory]
  )

  // const ImageStyleSelection = useMemo(() => {
  //   return (
  //     <div className="flex flex-col gap-2">
  //       <h2 className="h2 font-extrabold">Format</h2>
  //       <div className="grid h-auto grid-cols-2 gap-4	md:grid-cols-4">
  //         {Object.entries(IMAGE_STYLE).map(([key, value]) => (
  //           <div
  //             key={key}
  //             onClick={() => imageConfigSelect('imageStyle', value.value)}
  //             className={`flex aspect-square cursor-pointer flex-col items-center rounded-xl`}
  //           >
  //             <div className={`${imageConfig.imageStyle === value.value ? 'rounded-xl ring-2 ring-accent1-500' : ''} relative h-full w-full`}>
  //               {/* <Image src={value.image} alt={'style'} height={140} width={140} fill /> */}
  //               <Image src={value.image} alt={'style'} fill />
  //             </div>
  //             <h3 className={`text-center font-bold ${imageConfig.imageStyle === value.value ? 'text-accent1-500' : ''}`}>{value.name}</h3>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }, [imageConfig.imageStyle, imageConfigSelect])

  const UsageSelection = useCallback(() => {
    const options = Object.entries(IMAGE_USAGE).map(([, value]) => ({
      value: value,
      label: value,
    }))

    const socialMediaOptions: DropdownOption[] = Object.entries(SOCIAL_MEDIA_PLATFORMS).map(([, value]) => ({
      label: value,
      value: value,
    }))
    return (
      <div className="flex flex-col gap-4">
        <h2>Usage</h2>

        <div className="flex flex-row items-center justify-center gap-12">
          <div className="flex flex-row items-center gap-2">
            <RadioGroup
              defaultValue={Object.values(IMAGE_USAGE)[0]}
              options={options}
              selectedValue={imageConfig.usage.name}
              onValueChange={(value) => {
                usageSelect(value)
              }}
            />
          </div>
        </div>
        <div>
          {imageConfig.usage.name === IMAGE_USAGE.SOCIAL_MEDIA && (
            <Dropdown
              options={socialMediaOptions}
              onValueChange={(value) => {
                platformSelect(value as string)
              }}
              name={imageConfig.usage.platform ? imageConfig.usage.platform : 'Please Select'}
            />
          )}
        </div>
      </div>
    )
  }, [platformSelect, imageConfig?.usage.name, imageConfig?.usage.platform, usageSelect])

  const AspectRatioSelection = useCallback(() => {
    const options = Object.entries(IMAGE_ASPECT_RATIOS).map(([key, value]) => {
      return (
        <div className="flex w-full flex-col items-center justify-center rounded-xl" key={key}>
          <div
            className={`flex aspect-square h-auto max-h-48 w-full max-w-48 items-center justify-center rounded-xl bg-white px-8 py-4 ${
              imageConfig?.aspectRatio == value.value ? 'border-4 border-accent1-500' : 'border border-stroke'
            }`}
            onClick={() => imageConfigSelect('aspectRatio', value.value as keyof Selection)}
          >
            <div
              className="bg-[#D9D9D9] shadow-2xl"
              style={{
                aspectRatio: `${value.width} / ${value.height}`,
                width: `${value.width === 9 && value.height === 16 ? '70%' : '100%'}`,
              }}
            ></div>
          </div>
          <div>{value.label}</div>
        </div>
      )
    })
    return (
      <div className="flex flex-col gap-4">
        <h2 className="font-extrabold">Aspect ratio</h2>
        <div className="flex w-full items-center justify-center">
          <div className="grid aspect-square w-full grid-cols-2 gap-4">{options}</div>
        </div>
      </div>
    )
  }, [imageConfig?.aspectRatio, imageConfigSelect])

  const ImageCategorySelection = useCallback(() => {
    const entries = Object.entries(IMAGE_CATEGORY)

    return (
      <div>
        <h2>General</h2>
        <div className="flex flex-col gap-4">
          {entries.map(([key, value]) => (
            <Dropdown
              name={value.label}
              key={key}
              options={value.options}
              onValueChange={(selectedValue) => {
                onGeneralSelected(key as keyof ImageCategoryType, selectedValue)
              }}
            />
          ))}
        </div>
      </div>
    )
  }, [])

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <div onClick={goBack}>Back</div>

        <h2 className="h2 font-extrabold">Format</h2>
        <div className="grid h-auto grid-cols-2 gap-4	md:grid-cols-4">
          {Object.entries(IMAGE_STYLE).map(([key, value]) => (
            <div
              key={key}
              onClick={() => imageConfigSelect('imageStyle', value.value)}
              className={`flex aspect-square cursor-pointer flex-col items-center rounded-xl`}
            >
              <div className={`${imageConfig.imageStyle === value.value ? 'rounded-xl ring-2 ring-accent1-500' : ''} relative h-full w-full`}>
                {/* <Image src={value.image} alt={'style'} height={140} width={140} fill /> */}
                <Image src={value.image} alt={'style'} fill />
              </div>
              <h3 className={`text-center font-bold ${imageConfig.imageStyle === value.value ? 'text-accent1-500' : ''}`}>{value.name}</h3>
            </div>
          ))}
        </div>
      </div>
      <UsageSelection />
      <AspectRatioSelection />
      <ImageCategorySelection />
      <div className="mt-4 flex w-full items-center justify-center">
        <Primary onClick={onClickNextStep} sizes={['full', 'full', 'full']}>
          Generate Image
        </Primary>
      </div>
    </div>
  )
}

export default Step2
