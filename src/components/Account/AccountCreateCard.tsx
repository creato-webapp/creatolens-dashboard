import React, { useState } from 'react'

import Link from 'next/link'

import { IAccount } from '@components/Account/Account'
import Card from '@components/Card'
import Checkbox from '@components/Form/Checkbox'
import DynamicForm from '@components/Form/DynamicForm'
import { IField } from '@components/Form/interface'
import { Paragraph } from '@components/Typography'
import { Status } from '@context/DialogueContext'
import { useDialogues } from '@hooks/useDialogues'
import { createAccount } from '@services/Account/Account'
interface AccountCreateCardProps {
  isCreate: boolean
}

const AccountCreateCard: React.FC<AccountCreateCardProps> = ({ isCreate }) => {
  //TODO use library handle validation
  const { addDialogue } = useDialogues()
  const [isLoading, setIsLoading] = useState(false)
  const [isValidate, setIsValidated] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidated(event.target.checked)
  }

  const handleSubmit = async (values: IAccount) => {
    try {
      setIsLoading(true)
      const res = await createAccount(values.username, values.pwd)
      if (res.id) {
        addDialogue(`Account ${res.username} created successfully`, Status.SUCCESS)
      }
    } catch (err) {
      if (err && err instanceof Error) {
        addDialogue(`Failed to create account: ${err.message}`, Status.FAILED)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (values: IAccount) => {
    if (values.username) {
      if (values.username.includes(' ')) {
        alert('Username cannot contain spaces.')
        return
      }
    }
    if (values.pwd) {
      if (values.pwd.includes(' ')) {
        alert('Password cannot contain spaces.')
        return
      }
    }
    handleSubmit(values)
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
      type: 'CustomItem',
      name: 'custom',
      id: 'custom',
      component: (
        <Paragraph size="sm">
          By connecting your Instagram account, you agree to our terms and privacy policy. We may access your information for personalized data
          analyses and recommendation. Before using this app, you can review Creato&apos;s
          <Link
            className={'text-accent2-500'}
            href={`https://hickory-fight-55b.notion.site/Creato-Privacy-Policy-3e9a90f983d74fed8b4734c0775d897e`}
            target="_blank"
          >
            &nbsp;privacy policy
          </Link>
          &nbsp;and
          <Link
            className={'text-accent2-500'}
            href={`https://hickory-fight-55b.notion.site/Creato-Terms-Conditions-62e6fbb474394483bda8f81cd73b0a2a`}
            target="_blank"
          >
            &nbsp;terms of service
          </Link>
          . Please contact our team for support or questions.
        </Paragraph>
      ),
    },
    {
      type: 'CustomItem',
      name: 'custom',
      id: 'custom',
      component: (
        <Paragraph size="sm" className="flex w-full md:ml-auto md:mr-auto" bold>
          <Checkbox id="acknowledge" className="mr-2" onChange={handleChange}></Checkbox>I acknowledge and agree to the terms and privacy policy by
          checking this box.
        </Paragraph>
      ),
    },
  ]
  return (
    <Card
      className="ml-auto gap-1 !rounded-none border-none bg-white !p-4 shadow-none"
      title={isCreate ? '' : 'Accounts Info'}
      extra={
        isCreate && (
          <div className=" py-2">
            <span className="text-lg font-bold leading-loose text-rose-500">* </span>
            <span className="text-lg font-bold leading-loose text-neutral-800">Required</span>
          </div>
        )
      }
    >
      <DynamicForm
        onSubmit={onSubmit}
        loading={isLoading}
        fields={fields}
        allowSubmit={isValidate}
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
