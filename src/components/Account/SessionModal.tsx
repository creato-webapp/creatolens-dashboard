import type { FC } from 'react'
import { IAccount } from './interface'
import { Modal } from '@components/Modal'
import { Form } from '@components/Form'

interface SessionModalProps {
  account: IAccount
  loading: boolean
  isShow: boolean
  closeModal: React.ChangeEventHandler
}

interface Cookies {
  [key: string]: string
}

const dataItemToKeyValues = (item: Cookies[]) => {
  if (!item) return <></>
  const entries = Object.entries(item)
  const listItems = entries.map(([key, value]) => (
    <div>
      <li>
        <p className="break-all">{`${key}: ${value}`}</p>
      </li>
    </div>
  ))
  return <ul className="list-none">{listItems}</ul>
}

const SessionModal: FC<SessionModalProps> = ({
  account,
  loading,
  isShow,
  closeModal,
}) => {
  return (
    <Modal isShow={isShow} onCancel={closeModal} title="SessionModal">
      <code className="prose-code:text-blue-600">
        <div className="flex flex-wrap">
          {dataItemToKeyValues(account.session_cookies)}
        </div>
      </code>
    </Modal>
  )
}
export default SessionModal
