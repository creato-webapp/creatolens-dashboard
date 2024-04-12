import { FC, useState, useCallback } from 'react'
import { IAccount, Cookies } from '../../lib/Account/Account/interface'
import { Button } from '@components/Button'
import { GenericModal, GenericModalInterface } from './GenericModal'

interface SessionModalProps extends GenericModalInterface {
  account: IAccount | null
  updateSession: Function
}

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

const SessionModal: FC<SessionModalProps> = ({ account, updateSession }) => {
  const [isLoading, setIsLoading] = useState(false)
  // const { options } = props
  // const { closeModal } = useModals()

  // const modalOptions = {
  //   title: 'Session Modal',
  //   closeable: true,
  //   confirmable: false,
  //   cancelable: false,
  //   footer: '*User can update session model if an error occurred after 24 hours in this account.',
  //   ...options,
  // }

  const updateAccountSession = useCallback(async () => {
    try {
      setIsLoading(true)
      const res = await updateSession(account)
      window.alert(res.message)
    } catch (err) {
      window.alert(err)
    } finally {
      setIsLoading(false)
    }
  }, [account, updateSession])

  return (
    <GenericModal>
      <div className=" space-y-3">
        <code className="prose-code:text-blue-600">
          <div className="flex flex-wrap">{account && account.session_cookies && dataItemToKeyValues(account.session_cookies)}</div>
        </code>
        <div className="flex justify-center space-y-3">
          <Button.Primary loading={isLoading} onClick={updateAccountSession}>
            <div className="flex">Update Session</div>
          </Button.Primary>
        </div>
      </div>
    </GenericModal>
  )
}
export default SessionModal
