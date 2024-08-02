import { cert, initializeApp } from 'firebase-admin/app'
import { getRemoteConfig } from 'firebase-admin/remote-config'

const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
}

const app = initializeApp(
  {
    credential: cert(serviceAccount),
  },
  'server'
)

export const remoteConfig = getRemoteConfig(app)

export default app
