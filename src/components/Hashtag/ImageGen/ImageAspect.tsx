import Dropdown from '@components/Form/Dropdown/Dropdown'
import { useRemoteStringConfig } from '@hooks/useRemoteConfig'

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

  if (!imageAspectRatios) return null
  const options = Object.entries(imageAspectRatios).map(([key, value]) => ({ key, value: value.value, label: value.label }))

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Dropdown options={options} dropDownSizes={['m', 'm', 'm']} name="Please Select" />
      </div>
      {/* <div className="grid aspect-square w-full grid-cols-2 gap-4">
        {Object.entries(imageAspectRatios).map(([key, value]) => (
          <div className="flex w-full flex-col items-center justify-center rounded-xl" key={key}>
            <div
              className={`${
                value.value
              } flex aspect-square h-auto max-h-48 w-full max-w-48 items-center justify-center rounded-xl bg-white px-8 py-4 ${
                aspectRatio === value.value ? 'border-4 border-accent1-500' : 'border border-stroke'
              }`}
              onClick={() => setAspectRatio(value.value)}
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
      </div> */}
    </div>
  )
}

export default ImageAspectSelector
