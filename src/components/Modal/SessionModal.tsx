import { useCallback } from 'react'

import { useRouter } from 'next/router'

import { Button } from '@components/Button'
import { Status } from 'src/context/DialogueContext'
import { useAccount } from 'src/hooks/useAccount'
import { useDialogues } from 'src/hooks/useDialogues'

import { GenericModal } from './GenericModal'

import { Cookies, IAccount } from '../Account/Account/interface'

const dataItemToKeyValues = (item: Cookies) => {
  if (!item) return <></>
  const entries = Object.entries(item)
  const listItems = entries.map(([key, value], index) => (
    <div key={index}>
      <li>
        <p className="break-all">{`${key}: ${value}`}</p>
      </li>
    </div>
  ))
  return <ul className="list-none">{listItems}</ul>
}

export const SessionModal = () => {
  const router = useRouter()
  const { id } = router.query
  const { updateSession, data, isLoading } = useAccount(id as string, true)
  const { addDialogue } = useDialogues()

  const handleUpdateSubmit = useCallback(async () => {
    try {
      if (!data) {
        addDialogue(`Account session aborted`, Status.FAILED)
        return
      }
      await updateSession(data as IAccount)
      addDialogue(`Account session started update`, Status.SUCCESS)
    } catch (err) {
      if (err && err instanceof Error) {
        addDialogue(`Failed to update account: ${err.message}`, Status.FAILED)
      }
    }
  }, [addDialogue, data, updateSession])

  const modalOptions = {
    title: 'Session Modal',
    closeable: true,
    confirmable: false,
    cancelable: false,
    footer: '*User can update session model if an error occurred after 24 hours in this account.',
  }

  return (
    <GenericModal options={modalOptions}>
      <div className=" space-y-3">
        <code className="prose-code:text-blue-600">
          {isLoading ? (
            'Loading'
          ) : (
            <div className="flex flex-wrap">
              {data?.session_cookies ? dataItemToKeyValues(data.session_cookies) : 'This instabot do not have any cookies yet'}
            </div>
          )}
        </code>
        <div className="flex justify-center space-y-3">
          <Button.Primary loading={isLoading} onClick={handleUpdateSubmit}>
            <div className="flex">Update Session</div>
          </Button.Primary>
        </div>
      </div>
    </GenericModal>
  )
}
