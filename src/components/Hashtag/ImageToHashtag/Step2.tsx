import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'
import { StepProps } from './Step1'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Badges from '@components/Badges'
import Primary from '@components/Button/PrimaryButton'
import Outline from '@components/Button/OutlineButton'

const Step2 = (props: StepProps) => {
  const { setStep } = props
  const { images, currentImage } = useImageHashtagContext()
  const [imageURL, setImageURL] = useState<string | null>(null)
  const [reAnnotateTimes, setReAnnotateTimes] = useState<number>(1)

  const exampleLabels = ['123', '231', '123123', 'haidf']
  const [selectedLabel, setSelectedLabel] = useState<string[]>(exampleLabels)

  useEffect(() => {
    const currentImageObj = images[currentImage - 1]
    if (currentImageObj) {
      if (currentImageObj.image instanceof Blob) {
        const url = URL.createObjectURL(currentImageObj.image)
        setImageURL(url)
        // Cleanup function to revoke the object URL
        return () => URL.revokeObjectURL(url)
      } else if (typeof currentImageObj.image === 'string') {
        setImageURL(currentImageObj.image)
      }
    }
  }, [images, currentImage])

  const onClose = (label: string) => {
    setSelectedLabel((prevLabels) => prevLabels.filter((item) => item !== label))
  }

  const onSelected = (label: string) => {
    setSelectedLabel((prevLabels) => {
      if (!prevLabels.includes(label)) {
        return [...prevLabels, label]
      }
      return prevLabels
    })
  }

  const onReannotateClick = () => {
    setReAnnotateTimes((pre) => pre + 1)
  }
  const onClickButton = () => {
    setStep(3)
  }

  return (
    <div>
      <div>Image label annotation</div>
      <div className="relative my-4 h-56 w-full">
        {imageURL && (
          <Image
            fill={true}
            src={imageURL}
            objectFit="contain"
            className="rounded-3xl"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="testing"
          />
        )}
      </div>
      <div>Selected labels: {1 / 10}:</div>
      <div>
        <div className="flex flex-row flex-wrap gap-4">
          {exampleLabels.map((label) => {
            return (
              <Badges
                key={`key-${label}`}
                rounded
                closeable
                isOutline={!selectedLabel.includes(label)}
                onClose={() => onClose(label)}
                onClick={() => onSelected(label)}
                status={'primary'}
              >
                {label}
              </Badges>
            )
          })}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-6">
          <Outline sizes={['l', 'l', 'l']} onClick={onReannotateClick}>
            Re-Annotate({reAnnotateTimes})
          </Outline>
          <Primary sizes={['l', 'l', 'l']} onClick={onClickButton}>
            Annotate
          </Primary>
        </div>
      </div>
    </div>
  )
}

export default Step2
