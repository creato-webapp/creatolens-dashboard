import { useCallback } from 'react'

import Image from 'next/image'

import Primary from '@components/Button/Primary'
import { GENERAL, IMAGE_ASPECT_RATIOS, IMAGE_STYLE, IMAGE_USAGE, SOCIAL_MEDIA_PLATFORMS } from '@components/constants/imageStyle'
import Dropdown from '@components/Form/Dropdown'
import { DropdownOption } from '@components/Form/Dropdown'
import { RadioGroup } from '@components/Form/Radio/Group'

export interface StepProps {
  step: number
  setStep: (arg: number) => void
  setSelection: (arg: Partial<Selection> | ((prevSelection: Selection) => Selection)) => void
  selection: Selection
}

interface Selection {
  imageStyle: string
  aspectRatio: string
}

const Step2 = (props: StepProps) => {
  const { setStep, setSelection, selection } = props

  const gotoNextStep = () => {
    setStep(3)
    return null
  }

  const styleSelect = useCallback(
    (key: keyof Selection, value: string) => {
      setSelection((prevSelection) => ({
        ...prevSelection,
        [key]: value,
      }))
    },
    [setSelection]
  )

  const ImageStyleSelection = useCallback(() => {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="h2 font-extrabold">Format</h2>
        <div className="grid h-auto grid-cols-2 gap-4	md:grid-cols-4">
          {Object.entries(IMAGE_STYLE).map(([key, value]) => (
            <div
              key={key}
              onClick={() => styleSelect('imageStyle', value.value)}
              className={`flex aspect-square cursor-pointer flex-col items-center rounded-xl`}
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
      <div className="flex flex-col gap-4">
        <h2>Usage</h2>

        <div className="flex flex-row items-center justify-center gap-12">
          <div className="flex flex-row items-center gap-2">
            <RadioGroup defaultValue={Object.values(IMAGE_USAGE)[0]} options={options} onValueChange={function (): void {}} />
          </div>
        </div>
        <div>
          <Dropdown name="Please Select" options={socialMediaOptions} />
        </div>
      </div>
    )
  }, [])

  const AspectRatioSelection = useCallback(() => {
    const options = Object.entries(IMAGE_ASPECT_RATIOS).map(([key, value]) => {
      return (
        <div className="flex w-full flex-col items-center justify-center rounded-xl" key={key}>
          <div
            className={`flex aspect-square h-auto max-h-48 w-full max-w-48 items-center rounded-xl bg-white px-8 py-4 ${
              selection.aspectRatio == value.value ? 'border-4 border-accent1-500' : 'border border-stroke'
            }`}
            onClick={() => styleSelect(value.value, 'aspectRatio')}
          >
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
      <div className="flex flex-col gap-4">
        <h2 className="font-extrabold">Aspect ratio</h2>
        <div className="flex w-full items-center justify-center">
          <div className="grid aspect-square w-full grid-cols-2 gap-4">{options}</div>
        </div>
      </div>
    )
  }, [])

  const GeneralSelection = useCallback(() => {
    const options = Object.entries(GENERAL).map(([, value]) => {
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
    <div className="flex flex-col gap-2">
      <ImageStyleSelection />
      <UsageSelection />
      <AspectRatioSelection />
      <GeneralSelection />
      <div className="mt-4 flex w-full items-center justify-center">
        <Primary onClick={gotoNextStep} sizes={['full', 'full', 'full']}>
          Generate Image
        </Primary>
      </div>
    </div>
  )
}

export default Step2
