import Primary from '@components/Button/PrimaryButton'
import ImageUpload from '../ImageUpload'

export interface StepProps {
  step: number
  setStep: (arg: number) => void
}
const Step1 = (props: StepProps) => {
  const { setStep } = props

  const onClickButton = () => {
    setStep(2)
  }

  return (
    <div>
      <h2 className="font-extrabold">Image Upload</h2>
      <div className="mt-4"></div>

      <ImageUpload />
      <div className="mt-4 flex items-center justify-center">
        <Primary sizes={['l', 'l', 'l']} onClick={onClickButton}>
          Annotate
        </Primary>
      </div>
    </div>
  )
}
export default Step1
