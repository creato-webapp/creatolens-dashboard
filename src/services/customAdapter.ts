import { FirestoreAdapter } from '@next-auth/firebase-adapter'
import { AdapterUser } from 'next-auth/adapters'
import { Awaitable } from 'next-auth/index'

import { getRoles } from '@services/util'

export interface FirestoreAdapterOptions {
  emulator?: {
    host?: string
    port?: number
  }
}

interface CombinedUser extends AdapterUser {
  roles: string[]
}

export interface FirebaseConfig {
  apiKey: string
  appId: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  databaseURL?: string
}

export const FireStoreAdapterWrapper = (options: FirebaseConfig) => {
  const adapter = FirestoreAdapter(options)
  adapter.createUser = async (user: CombinedUser) => {
    const roles = await getRoles(user.email)
    const combinedUser = { ...(user as CombinedUser), roles: roles }
    if (FirestoreAdapter(options).createUser) {
      return FirestoreAdapter(options).createUser(combinedUser) as Awaitable<AdapterUser>
    }
    return combinedUser
  }
  return adapter
}
