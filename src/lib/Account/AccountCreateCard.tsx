import React from 'react'
import Card from '@components/Card'
import { IField } from '@components/Form/interface'
import { IAccount } from '@lib/Account/Account'
import { Paragraph } from '@components/Typography'
import Checkbox from '@components/Form/Checkbox'
import DynamicForm from '@components/Form/DynamicForm'
interface AccountCreateCardProps {
  isLoading: boolean
  isCreate: boolean
  account?: IAccount
  handleSubmit: (values: IAccount) => void
  setIsShow: (show: boolean) => void
  isChecked: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AccountCreateCard: React.FC<AccountCreateCardProps> = ({ isLoading, isCreate, handleSubmit, isChecked, handleChange }) => {
  const onSubmit = async (values: IAccount) => {
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
    valid ? handleSubmit(values) : alert(newErrors.username + '\n' + newErrors.pwd)
  }

  const fields: IField[] = [
    {
      label: 'Instagram account',
      type: 'text',
      name: 'username',
      id: 'username',
      required: true,
      placeholder: 'Enter username',
    },
    {
      label: 'Account password',
      type: 'password',
      name: 'pwd',
      id: 'pwd',
      required: true,
      placeholder: 'Enter password',
    },
    {
      label: 'custom',
      type: 'CustomItem',
      name: 'custom',
      id: 'custom',
      component: (
        <Paragraph size="sm">
          By connecting your Instagram account, you agree to our terms and privacy policy. We may access your information for personalized features
          and analysis. Your data is protected, but not 100% secure. Contact support for questions.
        </Paragraph>
      ),
    },
    {
      label: 'custom',
      type: 'CustomItem',
      name: 'custom',
      id: 'custom',
      component: (
        <Paragraph size="sm" className="flex w-full md:ml-auto md:mr-auto" bold>
          <Checkbox id="acknowledge" className="mr-2" onChange={(event) => handleChange(event)}></Checkbox>I acknowledge and agree to the terms and
          privacy policy by checking this box.
        </Paragraph>
      ),
    },
  ]
  return (
    <Card
      className="ml-auto gap-1 !rounded-none border-none bg-white !p-4 shadow-none"
      title={isCreate ? '' : 'Accounts Info'}
      extra={
        isCreate ? (
          <div className=" py-2">
            <span className="text-lg font-bold leading-loose text-rose-500">* </span>
            <span className="text-lg font-bold leading-loose text-neutral-800">Required</span>
          </div>
        ) : (
          <></>
        )
      }
    >
      <DynamicForm
        onSubmit={onSubmit}
        loading={isLoading}
        fields={fields}
        allowSubmit={!isChecked}
        formStyles=""
        formInnerStyles="py-px px-0"
        buttonStyles="w-full"
        buttonText="Create"
        buttonSizes={['m', 'm', 'm']}
      ></DynamicForm>
    </Card>
  )
}

export default AccountCreateCard
