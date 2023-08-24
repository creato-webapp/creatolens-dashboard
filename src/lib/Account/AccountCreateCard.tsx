import React from 'react'
import Card from '@components/Card'
import { Form } from '@components/Form'
import { IField } from '@components/Form/interface'
import { IAccount } from '@lib/Account/Account'
import { Paragraph } from '@components/Typography'
import Checkbox from '@components/Form/Checkbox'

interface AccountCreateCardProps {
  isLoading: boolean
  isCreate: boolean
  account: IAccount
  handleSubmit: (values: IAccount) => void
  setIsShow: (show: boolean) => void
  isChecked: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AccountCreateCard: React.FC<AccountCreateCardProps> = ({ isLoading, isCreate, account, handleSubmit, setIsShow, isChecked, handleChange }) => {
  const onSubmit = (values: IAccount) => {
    let valid = true
    const newErrors = { username: '', pwd: '' }
    if (values.username) {
      if (values.username.includes(' ')) {
        newErrors.username = 'Username cannot contain spaces.'
        valid = false
      }
    }
    if (values.pwd) {
      if (values.pwd.includes(' ')) {
        newErrors.pwd = 'Password cannot contain spaces.'
        valid = false
      }
    }
    console.log(values)
    valid ? handleSubmit(values) : alert(newErrors.username + '\n' + newErrors.pwd)
  }

  const fields: IField[] = [
    {
      label: 'Username',
      type: 'Input',
      name: 'username',
      customFormItemProps: { required: true, placeholder: 'Enter username' },
    },
    {
      label: 'Password',
      type: 'InputPassword',
      name: 'pwd',
      customFormItemProps: { required: true, placeholder: 'Enter password' },
    },
  ]
  return (
    <Card
      className="ml-auto mr-auto mb-8 w-2/5"
      title={isCreate ? '' : 'Accounts Info'}
      extra={
        isCreate ? (
          <div>
            <span className="text-lg font-bold leading-loose text-rose-500">* </span>
            <span className="text-lg font-bold leading-loose text-neutral-800">Required</span>
          </div>
        ) : (
          <></>
        )
      }
    >
      <Form.Layout onSubmit={onSubmit} Header={account.username} loading={isLoading} fields={fields} allowSubmit={!isChecked}>
        {fields.map((e: IField, index) => (
          <Form.Item label={e.label} key={index} customFormItemProps={e.customFormItemProps}>
            <Form.CustomItem id={e.name} defaultValue={account[e.name]} type={e.type} customFormItemProps={e.customFormItemProps} />
          </Form.Item>
        ))}
        <Paragraph size="sm">
          By connecting your Instagram account, you agree to our terms and privacy policy. We may access your information for personalized features
          and analysis. Your data is protected, but not 100% secure. Contact support for questions.
        </Paragraph>

        <Paragraph size="sm" className="ml-auto mr-auto flex w-1/2" bold>
          <Checkbox id="acknowledge" className="mr-2" onChange={(event) => handleChange(event)}></Checkbox>I acknowledge and agree to the terms and
          privacy policy by checking this box.
        </Paragraph>
      </Form.Layout>
    </Card>
  )
}

export default AccountCreateCard
