import React, { useCallback, useState } from 'react'

import { useRouter } from 'next/router'

import { IAccount } from '@components/Account/Account/interface'
import { AccountBadges } from '@components/Badges'
import { Button } from '@components/Button'
import Card from '@components/Card'
import DynamicForm from '@components/Form/DynamicForm'
import { IField } from '@components/Form/interface'
import { Paragraph } from '@components/Typography'
import { Status } from '@context/DialogueContext'
import { ModalKeyEnum } from '@context/ModalContext'
import { useAccount } from '@hooks/useAccount'
import { useDialogues } from '@hooks/useDialogues'
import { useModals } from '@hooks/useModal'
import dayjs from '@utils/dayjs'

interface AccountInfoCardProps {
  account: IAccount
}
const AccountInfoCard: React.FC<AccountInfoCardProps> = ({ account }) => {
  const router = useRouter()
  const { addDialogue } = useDialogues()
  const { id } = router.query
  const [isLoading, setIsLoading] = useState(false)
  const { updateAccount, setShouldFetch } = useAccount(id as string, false, account)
  const { openModal, onClearCallbacks, onCloseRegistry } = useModals()

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
          <AccountBadges status={account.status} />
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
    onCloseRegistry(() => console.log('test')) // eslint-disable-line no-console
    openModal(ModalKeyEnum.SESSION)
    return () => {
      onClearCallbacks
    }
  }, [onCloseRegistry, openModal, onClearCallbacks])

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
