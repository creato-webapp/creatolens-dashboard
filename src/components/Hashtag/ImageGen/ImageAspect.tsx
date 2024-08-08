import { useRemoteConfig } from '@hooks/useRemoteConfig'

export type ImageAspectRatioListType = {
  [key: string]: ImageAspectRatioType
}

type ImageAspectRatioType = {
  label: string
  value: string
  width: number
  height: number
}

interface ImageAspectSelectorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  aspectRatio: string
  setAspectRatio: (aspectRatio: string) => void
}
const IMAGE_ASPECT_KEY = 'IMAGE_ASPECT_RATIOS'

const ImageAspectSelector = ({ aspectRatio, setAspectRatio }: ImageAspectSelectorProps) => {
  const { configValue: ImageAspectRatios } = useRemoteConfig<ImageAspectRatioListType>(IMAGE_ASPECT_KEY)

  if (!ImageAspectRatios) return null

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-extrabold">Aspect ratio</h2>
      <div className="grid aspect-square w-full grid-cols-2 gap-4">
        {Object.entries(ImageAspectRatios).map(([key, value]) => (
          <div className="flex w-full flex-col items-center justify-center rounded-xl" key={key}>
            <div
              className={`flex aspect-square h-auto max-h-48 w-full max-w-48 items-center justify-center rounded-xl bg-white px-8 py-4 ${
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
      </div>
    </div>
  )
}

export default ImageAspectSelector
