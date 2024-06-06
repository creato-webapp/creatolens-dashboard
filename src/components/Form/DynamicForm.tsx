import { ReactNode } from 'react'

import { Paragraph } from '@components/Typography'
import dayjs from 'src/utils/dayjs'

import { FormLayoutProps, InputType } from './interface'

import { Button } from '..'

import { Form } from '.'

export type FormField = {
  type: InputType
  label?: string
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
    const values: { [key: string]: string | number | boolean } = {}

    fields.forEach((e) => {
      if (e.type === 'CustomItem') {
        // Skip CustomItem types
        return
      }
      if (e.type === 'checkbox') {
        // Directly assign boolean values for checkboxes
        values[e.name] = target[e.name].checked
      } else if (e.type === 'datetime-local') {
        // Format datetime inputs
        values[e.name] = dayjs(target[e.name].value).format('YYYY-MM-DDTHH:mm:ss')
      } else if (e.type === 'number') {
        // Convert string to number for numeric inputs
        values[e.name] = Number(target[e.name].value)
      } else {
        // Assign string values for all other types
        values[e.name] = target[e.name].value
      }
    })
    onSubmit(values as T)
  }

  const renderFormField = (field: FormField) => {
    switch (field.type) {
      case 'text':
        return <Form.TextInput {...field} />
      case 'number':
        return <Form.InputNumber {...field} />
      case 'password':
        return <Form.InputPassword {...field} />
      case 'checkbox':
        return <Form.Checkbox {...field} />
      case 'time':
        return <Form.TimePicker {...field} />
      case 'date':
        return <Form.DatePicker {...field} />
      case 'datetime-local':
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
              className={`md:w-full ${buttonStyles}`}
              disabled={!allowSubmit}
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
