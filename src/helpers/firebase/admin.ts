import admin, { ServiceAccount } from 'firebase-admin'
const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
} as ServiceAccount

const FIREBASE_ADMIN_APP_NAME = 'server'

let app = admin.apps.length ? admin.app(FIREBASE_ADMIN_APP_NAME) : null
if (!app) {
  app = admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
    },
    FIREBASE_ADMIN_APP_NAME
  )
}

export const remoteConfig = app && app.remoteConfig()

module.exports = { remoteConfig }
