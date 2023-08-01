import { FC, useState } from 'react'
import { IAccount } from './interface'
import { Modal } from '@components/Modal'
import { Button } from '@components/Button'
import { Fetcher } from 'services/fetcher'
import { useSession } from 'next-auth/react'
import { User } from 'next-auth'

interface SessionModalProps {
  isDisable: boolean
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

const SessionModal: FC<SessionModalProps> = ({ account, loading, isDisable, isShow, closeModal, refresh }) => {
  const [isLoading, setIsLoading] = useState(false)
  const { data: session, status } = useSession()
  const user = session?.user as User
  const updateAccountSession = async (account: IAccount) => {
    try {
      setIsLoading(true)
      const res = await Fetcher.POST(
        `/api/accounts/session/${account.id}`,
        {
          username: account.username,
        },
        { timeout: 30000 }
      )
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
    <Modal isLoading={isLoading} isShow={isShow} onCancel={closeModal} title="SessionModal">
      <code className="prose-code:text-blue-600">
        <div className="flex flex-wrap">{dataItemToKeyValues(account.session_cookies)}</div>
      </code>
      <div className="flex justify-start space-y-2">
        <Button.Primary
          // disabled={user?.role !== 'admin' || isDisable}
          loading={isLoading}
          onClick={() => updateAccountSession(account)}
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
