import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getRemoteConfig } from 'firebase/remote-config'

import firebaseConfig from './config'

const app = initializeApp(firebaseConfig, 'client')

export const analytics = getAnalytics(app)
export const remoteConfig = getRemoteConfig(app)

export default app
