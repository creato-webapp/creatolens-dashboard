import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { getRoles } from '@services/util'
import { Awaitable } from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
export interface FirestoreAdapterOptions {
  emulator?: {
    host?: string
    port?: number
  }
}

interface CombinedUser extends AdapterUser {
  roles: string[]
}

export const FireStoreAdapterWrapper = (options: any) => {
  const adapter = FirestoreAdapter(options)
  adapter.createUser = async (user) => {
    const roles = await getRoles(user.email)
    const combinedUser = { ...(user as CombinedUser), roles: roles }
    if (FirestoreAdapter(options).createUser) {
      return FirestoreAdapter(options).createUser?.(combinedUser) as Awaitable<AdapterUser>
    }
    return combinedUser
  }
  return adapter
}
