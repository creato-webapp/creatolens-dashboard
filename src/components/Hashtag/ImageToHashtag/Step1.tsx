import Primary from '@components/Button/PrimaryButton'
import ImageUpload from '../ImageUpload'
import { useState } from 'react'
import { uploadImage } from '@services/Image'
import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'
export interface StepProps {
  step: number
  setStep: (arg: number) => void
}

type ImageDetailsType = {
  path?: string
  format?: string
  extension?: string
}

const Step1 = (props: StepProps) => {
  const { setStep } = props
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadedImage, setUploadedImage] = useState<Blob | null>(null)
  const [imageDetails, setImageDetails] = useState<ImageDetailsType>({})

  const { addImage } = useImageHashtagContext()

  const onClickButton = async () => {
    if (!uploadedImage) {
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
  }

  return (
    <div>
      <h2 className="font-extrabold">Image Upload</h2>
      <div className="mt-4"></div>

      <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} setImageDetails={setImageDetails} />
      <div className="mt-4 flex items-center justify-center">
        <Primary disabled={uploading} sizes={['full', 'full', 'full']} onClick={onClickButton}>
          Annotate
        </Primary>
      </div>
    </div>
  )
}
export default Step1
