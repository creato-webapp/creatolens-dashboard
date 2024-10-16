import { Switch } from '@components/ui/Switch'
import { useState } from 'react'

const SwitchPage = () => {
  const [value, setValue] = useState<boolean>(false)
  return (
    <div className="">
      <div className="w-48 ">
        <Switch
          label="Testing"
          description="description"
          disabled
          checked={value}
          onCheckedChange={() => {
            setValue((pre) => !pre)
          }}
        />
      </div>
      <div className="w-48 ">
        <Switch
          label="Testing"
          description="description"
          checked={value}
          onCheckedChange={() => {
            setValue((pre) => !pre)
          }}
        />
      </div>
    </div>
  )
}

export default SwitchPage
