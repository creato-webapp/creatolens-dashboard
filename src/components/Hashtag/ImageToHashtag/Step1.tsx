import Primary from '@components/Button/PrimaryButton'
import ImageUpload from '../ImageUpload'
import { useState } from 'react'
import { getImageUploadUrl } from '@services/Image'
import axios from 'axios'
export interface StepProps {
  step: number
  setStep: (arg: number) => void
}
const Step1 = (props: StepProps) => {
  const [uploading, setUploading] = useState<boolean>(false)
  const [uploadedImage, setUploadedImage] = useState<Blob | null>(null)

  const getImageUploadLink = async () => {
    const filename = 'test.png'
    const format = 'image/png'

    const data = {
      args: { filename, format },
    }
    const response = await getImageUploadUrl(data)
    return response.data
  }
  const onClickButton = async () => {
    // setStep(2)
    setUploading(true)
    const url = await getImageUploadLink()

    const response = await axios.put(`${url}`, uploadedImage, {
      headers: {
        'Content-Type': '',
      },
    })

    console.log('url', response)
  }

  return (
    <div>
      <h2 className="font-extrabold">Image Upload</h2>
      <div className="mt-4"></div>

      <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
      <div className="mt-4 flex items-center justify-center">
        <Primary disabled={uploading} sizes={['full', 'full', 'full']} onClick={onClickButton}>
          Annotate
        </Primary>
      </div>
    </div>
  )
}
export default Step1
