import Primary from '@components/Button/PrimaryButton'
import ImageUpload from '../ImageUpload'
import { useState } from 'react'
import { useImageHashtagContext } from 'src/context/ImageToHashtagContext'

export interface StepProps {
  step: number
  setStep: (arg: number) => void
}
const Step1 = (props: StepProps) => {
  const { setStep } = props
  const { addImage } = useImageHashtagContext()
  const [uploadedImage, setUploadedImage] = useState<Blob | null>(null)

  const onClickButton = () => {
    setStep(2)
    addImage(uploadedImage!, [])
  }

  return (
    <div>
      <h2 className="font-extrabold">Image Upload</h2>
      <div className="mt-4"></div>

      <ImageUpload uploadedImage={uploadedImage} setUploadedImage={setUploadedImage} />
      <div className="mt-4 flex items-center justify-center">
        <Primary sizes={['l', 'l', 'l']} onClick={onClickButton}>
          Annotate
        </Primary>
      </div>
    </div>
  )
}
export default Step1
