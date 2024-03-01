import React, { useCallback } from 'react'
import Card from '@components/Card'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { IField } from '@components/Form/interface'
import { IAccount } from '@lib/Account/Account/interface'
import { Paragraph } from '@components/Typography'
import StatusTag from '@lib/StatusTag'
interface AccountInfoCardProps {
  isLoading: boolean
  isCreate: boolean
  account: IAccount
  handleSubmit: (values: IAccount) => void
  setIsShow: (show: boolean) => void
}

const AccountInfoCard: React.FC<AccountInfoCardProps> = ({ isLoading, account, handleSubmit, setIsShow }) => {
  const accountInfoField: IField[] = [
    {
      label: 'login count',
      type: 'InputNumber',
      name: 'login_count',
      customFormItemProps: { disabled: true },
    },
    {
      label: 'ID',
      type: 'Input',
      name: 'id',
    },
    {
      label: 'created by',
      type: 'Input',
      name: 'created_by',
      customFormItemProps: { disabled: true },
    },
    {
      label: 'updated by',
      type: 'Input',
      name: 'updated_by',
      customFormItemProps: { disabled: true },
    },
  ]
  const checkBoxField: IField[] = [
    {
      label: 'enabled',
      type: 'Checkbox',
      name: 'enabled',
    },
    {
      label: 'is_authenticated',
      type: 'Checkbox',
      name: 'is_authenticated',
    },
    {
      label: 'is_occupied',
      type: 'Checkbox',
      name: 'is_occupied',
    },
  ]
  const fields: IField[] = [
    {
      label: 'username',
      type: 'Input',
      name: 'username',
      customFormItemProps: { required: true },
    },
    {
      label: 'password',
      type: 'InputPassword',
      name: 'pwd',
      customFormItemProps: { required: true },
    },

    {
      label: 'login attempt count',
      type: 'InputNumber',
      name: 'login_attempt_count',
      customFormItemProps: { disabled: true },
    },
    {
      label: 'post_scrapped_count',
      type: 'InputNumber',
      name: 'post_scrapped_count',
      customFormItemProps: { disabled: true },
    },
    {
      label: 'last_login_dt',
      type: 'DateTimePicker',
      name: 'last_login_dt',
      customFormItemProps: { required: true },
    },
  ]
  const handleClick = useCallback(() => {
    setIsShow(true)
  }, [])
  return (
    <Card
      className="mb-8 ml-auto mr-auto mt-0 w-full border-none bg-bg-white shadow-none"
      customTitle={<h3 className="mr-auto w-auto pt-2 text-4xl text-text-primary">Account Info</h3>}
      extra={
        <Button.Primary loading={isLoading} onClick={handleClick}>
          Open Session Modal
        </Button.Primary>
      }
    >
      <Form.Layout<IAccount>
        onSubmit={handleSubmit}
        Header={account.username}
        loading={isLoading}
        fields={[...fields, ...checkBoxField]}
        allowSubmit={!!isLoading}
      >
        <div className="flex flex-wrap justify-between">
          <div className="">
            <Paragraph key={'0'} size={'lg'} bold className="font-bold">
              Status
            </Paragraph>
            <Paragraph key={'status'}>
              <StatusTag status={account['status']}></StatusTag>
            </Paragraph>
          </div>
          {accountInfoField.map((e: IField) => {
            const value = account[e.name as keyof Omit<IAccount, 'session_cookies'>]
            return (
              <div key={e.label}>
                <Paragraph size={'lg'} bold className="font-bold">
                  {e.label}
                </Paragraph>
                <Paragraph key={e.name}>{value as string}</Paragraph>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap gap-8 ">
          {checkBoxField.map((e: IField, index) => {
            const value = account[e.name] as string
            return (
              <Form.Item label={e.label} key={index} customFormItemProps={e.customFormItemProps}>
                <Form.CustomItem id={e.name} defaultValue={value} type={e.type} customFormItemProps={e.customFormItemProps} />
              </Form.Item>
            )
          })}
        </div>

        {fields.map((e: IField, index) => {
          const value = account[e.name as keyof Omit<IAccount, 'session_cookies'>]
          return (
            <Form.Item label={e.label} key={index} customFormItemProps={e.customFormItemProps}>
              <Form.CustomItem id={e.name} defaultValue={value as string} type={e.type} customFormItemProps={e.customFormItemProps} />
            </Form.Item>
          )
        })}
      </Form.Layout>
    </Card>
  )
}

export default AccountInfoCard
