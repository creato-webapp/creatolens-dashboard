import { ReactNode } from 'react'
import { Form } from '.'
import { Button } from '..'
import { FormLayoutProps, InputType } from './interface'
import { Paragraph } from '@components/Typography'
const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export type FormField = {
  type: InputType
  label: string
  name: string
  placeholder?: string
  options?: Array<{ label: string; value: string }>
  component?: ReactNode
}

const DynamicForm = <T,>(props: FormLayoutProps<T>) => {
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

    fields.map((e) => {
      if (e.type === 'CustomItem') {
        console.log('CustomItem')
        return
      }
      return e.type == 'Checkbox'
        ? (values[e.name] = target[e.name].checked)
        : e.type == 'DateTimePicker'
        ? (values[e.name] = dayjs(target[e.name].value).format('YYYY-MM-DD THH:mm:ss'))
        : (values[e.name] = target[e.name].value)
    })
    onSubmit(values as T)
  }

  const renderFormField = (field: FormField) => {
    switch (field.type) {
      case 'Input':
        return <Form.BaseInput {...field} />
      case 'InputNumber':
        return <Form.InputNumber {...field} />
        // Implement NumberInput component and use here
        break
      case 'InputPassword':
        return <Form.InputPassword {...field} />
        break
      case 'Checkbox':
        return <Form.Checkbox {...field} />
        // Implement Checkbox component and use here
        break
      case 'TimePicker':
        return <Form.TimePicker {...field} />
        break
      case 'DatePicker':
        return <Form.DatePicker {...field} />

      case 'DateTimePicker':
        return <Form.DateTimePicker {...field} />
      case 'CustomItem':
        return field.component
      default:
        return null
    }
  }
  return (
    <div className={`${formStyles} form-container`}>
      <form onSubmit={SubmitHandler} className={`mx-auto max-w-xl px-4 py-9 text-gray-900 antialiased md:max-w-4xl ${formInnerStyles}`}>
        {Header && <h1 className="text-4xl font-bold">{Header}</h1>}
        {subHeader && <h2 className="text-2xl font-bold">{subHeader}</h2>}
        <div className="grid grid-cols-1 gap-8">
          {fields.length > 0 &&
            fields.map((field, index) => (
              <div key={index}>
                {field.label && (
                  <label className="inline-flex items-start">
                    <Paragraph className="font-semibold" font="h4">
                      {field.label}
                    </Paragraph>
                    {field?.required ? <span className="text-lg font-bold text-rose-500">{' *'}</span> : null}{' '}
                  </label>
                )}
                {renderFormField(field)}
              </div>
            ))}
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
      </form>
    </div>
  )
}

export default DynamicForm