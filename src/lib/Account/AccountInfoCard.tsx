import React, { useCallback, useState } from 'react'
import Card from '@components/Card'
import { useRouter } from 'next/router'
import { Button } from '@components/Button'
import { IField } from '@components/Form/interface'
import { IAccount } from '@lib/Account/Account/interface'
import { Paragraph } from '@components/Typography'
import { useAccount } from 'src/hooks/useAccount'
import StatusTag from '@lib/StatusTag'
import DynamicForm from '@components/Form/DynamicForm'
import SessionModal from '@lib/Account/Account/SessionModal'
import dayjs from '@services/Dayjs'
import { useDialogues, Status } from 'src/context/DialogueContext'
import { useModals } from 'src/context/ModalContext'
import Modal from '@components/Modal'
interface AccountInfoCardProps {
  account: IAccount
}

const AccountInfoCard: React.FC<AccountInfoCardProps> = ({ account }) => {
  const router = useRouter()
  const { addDialogue } = useDialogues()
  const { addModal } = useModals()
  const { id } = router.query
  const [isShow, setIsShow] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { data, error, updateAccount, updateSession, setShouldFetch } = useAccount(id as string, false, account)

  const handleUpdateSubmit = useCallback(
    async (values: IAccount) => {
      try {
        setShouldFetch(true)
        setIsLoading(true)
        const newValues = {
          ...account,
          ...values,
          last_login_dt: dayjs(values.last_login_dt, 'YYYY-MM-DDTHH:mm').utc().local().format('YYYY-MM-DD THH:mm:ss'),
        }
        const res = await updateAccount(newValues)
        if (res.id) {
          addDialogue(`Account ${res.username} updated successfully`, Status.SUCCESS)
          router.push(`/accounts`)
        } else {
          throw new Error('Failed to update account')
        }
      } catch (err) {
        if (err && err instanceof Error) {
          addDialogue(`Failed to update account: ${err.message}`, Status.FAILED)
        }
      } finally {
        setIsLoading(false)
      }
    },
    [account, router, updateAccount, setShouldFetch, addDialogue]
  )
  const accountInfoField: IField[] = [
    {
      label: 'Country',
      id: 'location',
      type: 'text',
      name: 'location',
      value: account['location'],
    },
    {
      label: 'login count',
      id: 'login_count',
      type: 'number',
      name: 'login_count',
      value: account['login_count'],
    },
    {
      label: 'ID',
      type: 'text',
      name: 'id',
      value: account['id'],
      id: 'id',
    },
    {
      label: 'created by',
      type: 'text',
      name: 'created_by',
      id: 'created_by',
      value: account['created_by'],
    },
    {
      label: 'updated by',
      type: 'text',
      name: 'updated_by',
      id: 'updated_by',
      value: account['updated_by'],
    },
  ]
  const checkBoxField: IField[] = [
    {
      label: 'enabled',
      type: 'checkbox',
      name: 'enabled',
      checked: account['enabled'],
      id: 'enabled',
    },
    {
      label: 'is_authenticated',
      type: 'checkbox',
      name: 'is_authenticated',
      checked: account['is_authenticated'],
      id: 'is_authenticated',
    },
    {
      label: 'is_occupied',
      type: 'checkbox',
      name: 'is_occupied',
      checked: account['is_occupied'],
      id: 'is_occupied',
    },
  ]
  const fields: IField[] = [
    {
      type: 'CustomItem',
      name: 'custom',
      id: 'custom',
      component: (
        <div className="">
          <Paragraph key={'0'} size={'lg'} bold className="font-bold">
            Status
          </Paragraph>
          <StatusTag status={account['status']}></StatusTag>
        </div>
      ),
    },
    {
      label: 'username',
      type: 'text',
      name: 'username',
      id: 'username',
      value: account['username'],
      required: true,
    },
    {
      label: 'password',
      type: 'password',
      name: 'pwd',
      value: account['pwd'],
      id: 'pwd',
      required: true,
    },
    {
      label: 'login attempt count',
      type: 'number',
      name: 'login_attempt_count',
      value: account['login_attempt_count'],
      id: 'login_attempt_count',
    },
    {
      label: 'post scrapped count',
      type: 'number',
      name: 'post_scrapped_count',
      value: account['post_scrapped_count'],
      id: 'post_scrapped_count',
    },
    {
      label: 'last_login_dt',
      type: 'datetime-local',
      name: 'last_login_dt',
      value: account['last_login_dt'],
      id: 'last_login_dt',
      required: true,
    },
  ]

  const combinedField: IField[] = [...accountInfoField, ...checkBoxField, ...fields]

  const handleClick = useCallback(() => {
    const sessionContent = <SessionModal account={account} updateSession={updateSession} />
    addModal(sessionContent, {
      title: 'Session Modal',
      closeable: true,
      confirmable: false,
      cancelable: false,
      footer: '*User can update session model if an error occurred after 24 hours in this account.',
    })
    setIsShow(true)
  }, [])

  return (
    <>
      <Card
        className="mb-8 ml-auto mr-auto mt-0 w-full border-none bg-bg-white shadow-none"
        customTitle={<h3 className="mr-auto w-auto pt-2 text-4xl text-text-primary">Account Info</h3>}
        extra={
          <Button.Primary loading={isLoading} onClick={handleClick}>
            Open Session Modal
          </Button.Primary>
        }
      >
        <DynamicForm onSubmit={handleUpdateSubmit} Header={account.username} loading={isLoading} fields={combinedField} allowSubmit={!isLoading} />
      </Card>
    </>
  )
}

export default AccountInfoCard
