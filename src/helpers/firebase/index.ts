import { analytics, default as client, remoteConfig as clientRemoteConfig } from './client'
import { default as admin, remoteConfig as adminRemoteConfig } from './admin'
import firebaseConfig from './config'

const firebase = {
  client: {
    app: client,
    analytics,
    remoteConfig: clientRemoteConfig,
  },
  admin: {
    app: admin,
    remoteConfig: adminRemoteConfig,
  },
  config: firebaseConfig,
}

export default firebase
