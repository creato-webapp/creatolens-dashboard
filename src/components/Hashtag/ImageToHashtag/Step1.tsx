import { useCallback, useState  } from 'react'

import Primary from '@components/Button/Primary'
import { uploadImage } from '@services/Image'
import { ImageDetailsType, useImageHashtagContext } from 'src/context/ImageToHashtagContext'

import ImageUpload from '../ImageUpload'

export interface StepProps {
  step: number
  setStep: (arg: number) => void
}

const Step1 = (props: StepProps) => {
  const { setStep } = props
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [imageDetails, setImageDetails] = useState<ImageDetailsType>({})

  const { addImage } = useImageHashtagContext()

  const onClickButton = useCallback(async () => {
    if (!uploadedImage || !imageDetails.format || !imageDetails.path) {
      return
    }

    setUploading(true)
    try {
      const data = {
        args: { username: 'timothy', file: uploadedImage, imageDetails },
      }

      const uploadedImageResponse = await uploadImage(data)
      addImage(uploadedImageResponse, [])
      setUploading(false)
      setStep(2)
    } catch (e) {
      setUploading(false)
    }
  }, [addImage, imageDetails, setStep, uploadedImage])
  return (
    <div className="flex flex-col gap-3 rounded-2xl md:flex-row md:p-12 md:shadow-lg">
      <h2 className="font-extrabold md:hidden">Image Upload</h2>
      <div className="mt-4 w-full md:mt-0 md:w-1/2">
        <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} setImageDetails={setImageDetails} />
      </div>
      <div className="flex w-full flex-col justify-center gap-4 md:w-1/2">
        <h2 className="hidden font-extrabold md:block">Image Upload</h2>

        <div className="flex flex-row flex-wrap items-center gap-x-4">
          {/* <Image src="/image-logo.png" alt="image logo" height={40} width={40} /> */}
          <h3 className="text-text-secondary">{imageDetails.path}</h3>
          {imageDetails.size && imageDetails.size > 0 && (
            <h3 className="text-disabled">File size: {(imageDetails.size / 1024 / 1024).toFixed(2)} MB</h3>
          )}
        </div>
        <div className="flex items-center justify-center">
          <Primary loading={uploading} sizes={['full', 'full', 'full']} onClick={onClickButton}>
            Annotate
          </Primary>
        </div>
      </div>
    </div>
  )
}
export default Step1
