import { FC, useState, useCallback } from 'react'
import { IAccount } from './interface'
import Modal from '@components/Modal'
import { Button } from '@components/Button'
import { ModalProps } from '@components/Modal'

interface SessionModalProps extends ModalProps {
  isDisable: boolean
  account: IAccount
  isLoading: boolean
  isShow: boolean
  updateSession: Function
  onCancel: () => void
}

interface Cookies {
  [key: string]: string
}

const dataItemToKeyValues = (item: Cookies[]) => {
  if (!item) return <></>
  const entries = Object.entries(item)
  const listItems = entries.map(([key, value], index) => (
    <div>
      <li key={index}>
        <p className="break-all">{`${key}: ${value}`}</p>
      </li>
    </div>
  ))
  return <ul className="list-none">{listItems}</ul>
}

const SessionModal: FC<SessionModalProps> = ({ account, isLoading: loading, isDisable, isShow, updateSession, onCancel }) => {
  const [isLoading, setIsLoading] = useState(false)
  const updateAccountSession = useCallback(async (account: IAccount) => {
    try {
      setIsLoading(true)
      const res = await updateSession(account)
      window.alert(res.message)
    } catch (err) {
      window.alert(err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  return (
    <Modal isLoading={isLoading} isShow={isShow} onCancel={onCancel} title="SessionModal">
      <code className="prose-code:text-blue-600">
        <div className="flex flex-wrap">{dataItemToKeyValues(account.session_cookies)}</div>
      </code>
      <div className="flex justify-start space-y-2">
        <Button.Primary
          // disabled={user?.role !== 'admin' || isDisable}
          loading={isLoading}
          onClick={() => updateAccountSession}
        >
          <div className="flex">Update Session</div>
        </Button.Primary>
      </div>
      <div>
        <p>*User can update session model if an error occurred after 24 hours in this account.</p>
      </div>
    </Modal>
  )
}
export default SessionModal
