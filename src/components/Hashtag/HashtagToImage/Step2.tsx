export interface StepProps {
  step: number
  setStep: (arg: number) => void
  setSelection: (arg: any) => void
  selection: any
}
const Step2 = (props: StepProps) => {
  return (
    <div className="flex flex-col gap-2">
    </div>
  )
}

export default Step2
