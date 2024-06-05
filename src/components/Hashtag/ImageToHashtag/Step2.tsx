import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'
import { StepProps } from './Step1'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Badges from '@components/Badges'

const Step2 = (props: StepProps) => {
  const { setStep } = props
  const { images, currentImage } = useImageHashtagContext()
  const [imageURL, setImageURL] = useState<string | null>(null)

  const exampleLabels = ['123', '231', '123123', 'haidf']

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
        <div className="grid grid-cols-3">
          {exampleLabels.map((label) => {
            return (
              <Badges key={`key-${label}`} className="grid" status={'primary'} rounded closeable>
                {label}
              </Badges>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Step2
