import { FirestoreAdapter } from '@next-auth/firebase-adapter'
export interface FirestoreAdapterOptions {
  emulator?: {
    host?: string
    port?: number
  }
}

export const FireStoreAdapterWrapper: typeof FirestoreAdapter = (options) => {
  const adapter = FirestoreAdapter(options)
  adapter.createUser = (user) => {
    user.role = 'player'
    return FirestoreAdapter(options).createUser(user)
  }
  return adapter
}
