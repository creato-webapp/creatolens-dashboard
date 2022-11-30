import { FC, useState } from 'react'
import { IAccount } from './interface'
import { Modal } from '@components/Modal'
import { Form } from '@components/Form'
import { Button } from '@components/Button'
import { Fetcher } from 'services/fetcher'
import { Spinner } from '../Spinner'
interface SessionModalProps {
  account: IAccount
  loading: boolean
  isShow: boolean
  closeModal: React.ChangeEventHandler
  refresh: Function
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

const SessionModal: FC<SessionModalProps> = ({
  account,
  loading,
  isShow,
  closeModal,
  refresh,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const updateAccountSession = async (account: IAccount) => {
    try {
      setIsLoading(true)
      const res = await Fetcher.POST(`/api/accounts/session/${account.id}`, {
        username: account.username,
      })
      window.alert('sessions uploaded')
      refresh()
      return res
    } catch (err) {
      window.alert(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      isLoading={isLoading}
      isShow={isShow}
      onCancel={closeModal}
      title="SessionModal"
    >
      <code className="prose-code:text-blue-600">
        <div className="flex flex-wrap">
          {dataItemToKeyValues(account.session_cookies)}
        </div>
      </code>
      <div className="flex justify-start space-y-2">
        <Button.Primary
          loading={isLoading}
          onClick={() => updateAccountSession(account)}
        >
          <div className="flex">Update Session</div>
        </Button.Primary>
      </div>
    </Modal>
  )
}
export default SessionModal
