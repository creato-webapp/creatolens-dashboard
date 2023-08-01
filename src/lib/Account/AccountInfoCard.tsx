import React from 'react'
import Card from '@components/Card'
import { Button } from '@components/Button'
import { Form } from '@components/Form'
import { IField } from '@components/Form/interface'
import { IAccount } from '@lib/Account/Account/interface'
import Paragraph from '@components/Typography/Paragraph'
import StatusTag from '@lib/StatusTag'
interface AccountInfoCardProps {
  isLoading: boolean
  isCreate: boolean
  account: IAccount
  handleSubmit: (values: IAccount) => void
  setIsShow: (show: boolean) => void
  isChecked: boolean
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const AccountInfoCard: React.FC<AccountInfoCardProps> = ({ isLoading, isCreate, account, handleSubmit, setIsShow, isChecked, handleChange }) => {
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
      label: 'pwd',
      type: 'Input',
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
  return (
    <Card
      className="ml-auto mr-auto mb-8 mt-0 w-full bg-bg-white"
      extra={
        <Button.Primary loading={isLoading} onClick={() => setIsShow(true)}>
          Open Session Modal
        </Button.Primary>
      }
    >
      <Form.Layout onSubmit={handleSubmit} Header={account.username} loading={isLoading} fields={fields} allowSubmit={!!isLoading}>
        <div className="flex flex-grow justify-between">
          <div className="">
            <Paragraph key={'0'} size={'lg'} bold className="font-bold">
              Status
            </Paragraph>
            <Paragraph key={'status'}>
              <StatusTag status={account['status']}></StatusTag>
            </Paragraph>
          </div>
          {accountInfoField.map((e: IField, index) => (
            <div>
              <Paragraph key={e.label} size={'lg'} bold className="font-bold">
                {e.label}
              </Paragraph>
              <Paragraph key={e.name}>{account[e.name]}</Paragraph>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-8 ">
          {checkBoxField.map((e: IField, index) => (
            <Form.Item label={e.label} key={index} customFormItemProps={e.customFormItemProps}>
              <Form.CustomItem id={e.name} defaultValue={account[e.name]} type={e.type} customFormItemProps={e.customFormItemProps} />
            </Form.Item>
          ))}
        </div>

        {fields.map((e: IField, index) => (
          <Form.Item label={e.label} key={index} customFormItemProps={e.customFormItemProps}>
            <Form.CustomItem id={e.name} defaultValue={account[e.name]} type={e.type} customFormItemProps={e.customFormItemProps} />
          </Form.Item>
        ))}
      </Form.Layout>
    </Card>
  )
}

export default AccountInfoCard
