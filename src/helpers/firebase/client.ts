import { FirebaseApp, getApps } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { Analytics, getAnalytics, isSupported } from 'firebase/analytics'
import { getRemoteConfig, RemoteConfig } from 'firebase/remote-config'

import firebaseConfig from './config'

const app: FirebaseApp = getApps().find((app) => app.name === 'client') || initializeApp(firebaseConfig, 'client')
let analytics: Analytics
let remoteConfig: RemoteConfig

isSupported().then((isBrowserSupported) => {
  if (isBrowserSupported) {
    analytics = getAnalytics(app)
    remoteConfig = getRemoteConfig(app)
  }
})

export { analytics, remoteConfig }
export default app
