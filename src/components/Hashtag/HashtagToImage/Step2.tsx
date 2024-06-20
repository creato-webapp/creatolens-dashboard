import Primary from '@components/Button/PrimaryButton'
import { useCallback, useState } from 'react'
import { IMAGE_STYLE, IMAGE_USAGE, SOCIAL_MEDIA_PLATFORMS, IMAGE_ASPECT_RATIOS, GENERAL } from '@components/constants/imageStyle'
import Image from 'next/image'
import { RadioGroup } from '@components/Form/Radio/Group'
import Dropdown from '@components/Form/Dropdown'
import { DropdownOption } from '@components/Form/Dropdown'
export interface StepProps {
  step: number
  setStep: (arg: number) => void
  setSelection: (arg: any) => void
  selection: any
}
const Step2 = (props: StepProps) => {
  const { step, setStep, setSelection, selection } = props
  const [choice, setChoice] = useState('')

  const gotoNextStep = () => {
    setStep(3)
    return null
  }

  const styleSelect = (value) => {
    setSelection((prevSelection) => ({
      ...prevSelection,
      imageStyle: value,
    }))
  }

  const ImageStyleSelection = useCallback(() => {
    return (
      <div>
        <h2 className="font-extrabold">Format</h2>
        <div className="grid grid-cols-2 md:grid-cols-4	">
          {Object.entries(IMAGE_STYLE).map(([key, value]) => (
            <div
              key={key}
              onClick={() => styleSelect(value.value)}
              className={`flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl`}
            >
              <div className={`${selection.imageStyle === value.value ? 'rounded-xl ring-2 ring-accent1-500' : ''} relative `}>
                <Image src={value.image} alt={'style'} height={128} width={128} />
              </div>
              <h3 className={`text-center font-bold ${selection.imageStyle === value.value ? 'text-accent1-500' : ''}`}>{value.name}</h3>
            </div>
          ))}
        </div>
      </div>
    )
  }, [selection.imageStyle, styleSelect])

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
      <div>
        <h2>Usage</h2>

        <div className="flex flex-row items-center justify-center gap-12">
          <div className="flex flex-row items-center gap-2">
            <RadioGroup
              defaultValue={Object.values(IMAGE_USAGE)[0]}
              options={options}
              onValueChange={function (value: string): void {
                console.log('value', value)
              }}
            />
          </div>
        </div>
        <div>
          <Dropdown options={socialMediaOptions} />
        </div>
      </div>
    )
  }, [])

  const AspectRatioSelection = useCallback(() => {
    const options = Object.entries(IMAGE_ASPECT_RATIOS).map(([key, value]) => {
      return (
        <div className="flex w-full flex-col items-center justify-center rounded-xl" key={key}>
          <div className="flex aspect-square h-auto w-full items-center border border-stroke bg-white px-8 py-4">
            <div
              className="bg-[#D9D9D9] shadow-2xl"
              style={{
                aspectRatio: `${value.width} / ${value.height}`,
                width: '100%',
              }}
            ></div>
          </div>
          <div>{value.label}</div>
        </div>
      )
    })
    return (
      <div>
        <h2 className="font-extrabold">Aspect ratio</h2>
        <div className="flex w-full items-center justify-center">
          <div className="grid aspect-square w-full grid-cols-2 gap-12">{options}</div>
        </div>
      </div>
    )
  }, [])

  const GeneralSelection = useCallback(() => {
    const options = Object.entries(GENERAL).map(([key, value]) => {
      return value
    })
    return (
      <div>
        <h2>General</h2>
        <div className="flex flex-col gap-4">
          {options.map((option) => {
            return <Dropdown name={option.label} key={option.label} options={option.options}></Dropdown>
          })}
        </div>
      </div>
    )
  }, [])

  return (
    <>
      Step2
      <ImageStyleSelection />
      <h3 className="font-semibold text-text-primary">Describe the image you want and we’ll generate image for you.</h3>
      <UsageSelection />
      <AspectRatioSelection />
      <GeneralSelection />
      <div className="mt-4 flex w-full items-center justify-center">
        <Primary onClick={gotoNextStep} sizes={['full', 'full', 'full']}>
          Generate Image
        </Primary>
      </div>
    </>
  )
}

export default Step2
