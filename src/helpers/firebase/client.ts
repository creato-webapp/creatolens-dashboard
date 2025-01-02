import { FirebaseApp, getApps } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { Analytics, getAnalytics, isSupported } from 'firebase/analytics'
import { getRemoteConfig, RemoteConfig } from 'firebase/remote-config'

import firebaseConfig from './config'

const DEFAULT_FETCH_INTERVAL = parseInt(process.env.NEXT_PUBLIC_FIREBASE_REFETCH_INTERVAL!)

const DEFAULT_TIMEOUT_MILLIS = 5000

const app: FirebaseApp = getApps().find((app) => app.name === 'client') || initializeApp(firebaseConfig, 'client')
let analytics: Analytics
let remoteConfig: RemoteConfig

isSupported().then((isBrowserSupported) => {
  if (isBrowserSupported) {
    analytics = getAnalytics(app)
    remoteConfig = getRemoteConfig(app)
    remoteConfig.settings = {
      minimumFetchIntervalMillis: DEFAULT_FETCH_INTERVAL || 12 * 60 * 60 * 1000,
      fetchTimeoutMillis: DEFAULT_TIMEOUT_MILLIS,
    }
  }
})

export { analytics, remoteConfig }
export default app
