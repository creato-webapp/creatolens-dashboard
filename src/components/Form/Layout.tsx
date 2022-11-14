import React, { FC } from 'react'
import { Button } from '../Button'
import { FormLayoutProps } from './interface'
import moment from 'moment'

const Layout: FC<FormLayoutProps> = (props: FormLayoutProps) => {
  const { Header, subHeader, loading, onSubmit, fields } = props
  const SubmitHandler = (
    event: React.FormEvent<EventTarget | HTMLFormElement>
  ) => {
    event.preventDefault()
    const target = event.target as typeof event.target & {
      [key: string]: { [key: string]: string }
    }
    var values: { [key: string]: string | number | boolean } = {}
    fields.map((e) =>
      e.type == 'Checkbox'
        ? (values[e.name] = target[e.name].checked)
        : e.type == 'DateTimePicker'
        ? (values[e.name] = moment(target[e.name].value).format(
            'YYYY-MM-DD THH:mm:ss'
          ))
        : (values[e.name] = target[e.name].value)
    )
    console.log(values)
    onSubmit(values)
  }

  return (
    <div className="form-container">
      <form onSubmit={(e) => SubmitHandler(e)}>
        <div className="px-6 text-gray-900 antialiased">
          <div className="mx-auto max-w-xl divide-y py-12 md:max-w-4xl">
            <div className="py-12">
              <h1 className="text-4xl font-bold">{Header}</h1>
              <h2 className="text-2xl font-bold">{subHeader}</h2>
              <div className="mt-8 max-w-md">
                <div className="grid grid-cols-1 gap-6">
                  {props.children}
                  <div className="ml-auto flex justify-end py-4">
                    <Button.Primary type="submit" loading={loading}>
                      Save
                    </Button.Primary>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Layout
