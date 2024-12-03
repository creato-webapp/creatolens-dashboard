import admin, { ServiceAccount } from 'firebase-admin'

const FIREBASE_APP_NAME = 'server'
const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
} as ServiceAccount

let app = admin.apps.length ? admin.app(FIREBASE_APP_NAME) : null

if (!app) {
  app = admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
    },
    FIREBASE_APP_NAME
  )
}

export const remoteConfig = app && app.remoteConfig()

module.exports = { remoteConfig }
