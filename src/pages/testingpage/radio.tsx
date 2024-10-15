import { Label } from '@components/ui/Label'
import { RadioGroup, RadioGroupItem } from '@components/ui/RadioGroup'

const RadioPage = () => {
  return (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem disabled value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem disabled value="option-four" id="option-four" />
        <Label htmlFor="option-four">Option Four</Label>
      </div>
    </RadioGroup>
  )
}

export default RadioPage
