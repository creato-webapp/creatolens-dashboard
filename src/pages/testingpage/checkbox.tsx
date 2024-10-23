import { Checkbox } from '@components/ui/Checkbox'

const CheckboxPage = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <div>Default Checkbox</div>
        <Checkbox />
        <div>Disabled Checkbox</div>
        <Checkbox disabled />
        <div>Checked Checkbox</div>
        <Checkbox checked />
        <div>Checked and Disabled Checkbox</div>
        <Checkbox checked disabled />
        <div>Another Default Checkbox</div>
        <Checkbox />
      </div>
    </div>
  )
}

export default CheckboxPage
