import { IAccount } from '@components/Account/Account'
import XAPI from '@constants/endpoints/xapi'

import useRequest from './useRequest'
import METHOD from '@constants/method'
import useMutation from './useMutation'

type SessionUpdateResponse = {
  success: boolean
  message?: string
  // Include other fields expected in the response
}

type SessionUpdatePayload = {
  username: string
  password: string
  account_id: string
}

export const useAccount = (id: string, defaultShouldFetch: boolean = true, fallbackData?: IAccount) => {
  const { data, error, mutate, ...swr } = useRequest<IAccount>([XAPI.ACCOUNT + id], METHOD.GET, {
    shouldFetch: defaultShouldFetch,
    refreshInterval: 0,
    fallbackData: fallbackData,
  })
  const { trigger: triggerUpdateAccount } = useMutation<IAccount>(XAPI.ACCOUNT + id, METHOD.PATCH)
  const { trigger: triggerUpdateSession } = useMutation<SessionUpdateResponse, SessionUpdatePayload>(XAPI.ACCOUNT_SESSION + id, METHOD.POST)

  const updateAccount = async (updatedAccount: IAccount) => {
    const res = await triggerUpdateAccount({
      ...updatedAccount,
    })
    await mutate()
    return res
  }

  const updateSession = async (updatedAccount: IAccount) => {
    const res = await triggerUpdateSession({
      username: updatedAccount.username,
      password: updatedAccount.pwd,
      account_id: updatedAccount.id,
    })
    await mutate()
    return res
  }
  return {
    response: data,
    error,
    updateAccount,
    updateSession,
    mutate,
    ...swr,
  }
}
