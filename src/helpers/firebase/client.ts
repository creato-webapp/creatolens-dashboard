import { FirebaseApp } from 'firebase/app'
import { Analytics } from 'firebase/analytics'
import { RemoteConfig } from 'firebase/remote-config'

import firebaseConfig from './config'

let analytics: Analytics
let remoteConfig: RemoteConfig
let app: FirebaseApp

if (typeof window !== 'undefined') {
  const initFirebase = async () => {
    const { initializeApp } = await import('firebase/app')
    const { getAnalytics } = await import('firebase/analytics')
    const { getRemoteConfig } = await import('firebase/remote-config')

    app = initializeApp(firebaseConfig, 'client')
    analytics = getAnalytics(app)
    remoteConfig = getRemoteConfig(app)
  }

  initFirebase()
}

export { analytics, remoteConfig, app }
