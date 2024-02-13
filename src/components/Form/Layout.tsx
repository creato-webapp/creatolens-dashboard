import React, { FC } from 'react'
import { Button } from '../Button'
import { FormLayoutProps } from './interface'
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

const Layout: FC<FormLayoutProps> = (props: FormLayoutProps) => {
  const {
    Header,
    subHeader,
    loading,
    onSubmit,
    fields,
    allowSubmit,
    formStyles,
    formInnerStyles,
    buttonText = 'Save',
    buttonStyles,
    buttonSizes,
  } = props
  const SubmitHandler = (event: React.FormEvent<EventTarget | HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      [key: string]: { [key: string]: string }
    }
    let values: { [key: string]: string | number | boolean } = {}
    fields.map((e) =>
      e.type == 'Checkbox'
        ? (values[e.name] = target[e.name].checked)
        : e.type == 'DateTimePicker'
          ? (values[e.name] = dayjs(target[e.name].value).format('YYYY-MM-DD THH:mm:ss'))
          : (values[e.name] = target[e.name].value)
    )
    onSubmit(values)
  }

  return (
    <div className={`${formStyles} form-container`}>
      <form onSubmit={SubmitHandler} className={`mx-auto max-w-xl py-9 px-4 text-gray-900 antialiased md:max-w-4xl ${formInnerStyles}`}>
        <h1 className="text-4xl font-bold">{Header}</h1>
        <h2 className="text-2xl font-bold">{subHeader}</h2>
        <div className="">
          <div className="grid grid-cols-1 gap-8">
            {props.children}
            <div className={`flex justify-end pb-4 `}>
              <Button.Primary
                sizes={buttonSizes}
                styleClassName={buttonStyles}
                className="md:w-full"
                disabled={allowSubmit}
                type="submit"
                loading={loading}
              >
                <h4 className="font-medium">{buttonText}</h4>
              </Button.Primary>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Layout
