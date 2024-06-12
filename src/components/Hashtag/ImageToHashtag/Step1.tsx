import Primary from '@components/Button/PrimaryButton'
import ImageUpload from '../ImageUpload'
import { useEffect, useState } from 'react'
import { getImageUploadUrl, uploadImage } from '@services/Image'
export interface StepProps {
  step: number
  setStep: (arg: number) => void
}
const Step1 = (props: StepProps) => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadedImage, setUploadedImage] = useState<Blob | null>(null)
  const [imageDetails, setImageDetails] = useState<{
    path?: string
    format?: string
    extension?: string
  }>({})

  console.log('data', imageDetails)

  const getImageUploadLink = async () => {
    const filename = imageDetails.path
    const format = imageDetails.format

    const data = {
      args: { filename, format },
    }
    console.log('data', data)
    const response = await getImageUploadUrl(data)
    return response.data
  }
  const onClickButton = async () => {
    // setStep(2)
    if (!uploadedImage) {
      return
    }

    setUploading(true)
    try {
      const url = await getImageUploadLink()
      const data = {
        args: { url, file: uploadedImage, format: imageDetails.format },
      }
      const uploadimageprocess = await uploadImage(data)
      console.log('uploadimageprocess', uploadimageprocess)
      setUploading(false)
    } catch (e) {
      window.alert(e.message)
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
