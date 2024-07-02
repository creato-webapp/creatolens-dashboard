import Outline from '@components/Button/Outline'
import Primary from '@components/Button/Primary'
export interface StepProps {
  step: number
  setStep: (arg: number) => void
}
const Step1 = (props: StepProps) => {
  const { setStep } = props

  const gotoNextStep = () => {
    setStep(2)
    return null
  }
  return (
    <>
      <h2 className="font-extrabold">Keywords input</h2>
      <div className="mt-4 flex items-center justify-center">
        <Outline sizes={['l', 'l', 'l']}>+ Get Keywords from Image</Outline>
      </div>
      <div className="my-4 border-b"></div>
      <h3 className="font-semibold text-text-primary">Describe the image you want and we’ll generate image for you.</h3>
      <textarea
        className="mt-4 min-h-96 w-full border border-black p-5 text-text-disabled ring-0  focus:border-accent1-500 focus:ring-accent1-500"
        placeholder="Input your own keyword"
      />

      <div className="mt-4 flex items-center justify-center">
        <Primary onClick={gotoNextStep} sizes={['l', 'l', 'l']}>
          Next
        </Primary>
      </div>
    </>
  )
}

export default Step1
