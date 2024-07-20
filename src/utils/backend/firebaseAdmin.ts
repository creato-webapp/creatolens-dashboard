import admin, { ServiceAccount } from 'firebase-admin'

const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
} as ServiceAccount

let app = admin.apps.length ? admin.app('server') : null
if (!app) {
  app = admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
    },
    'server'
  )
}

export const remoteConfig = app && app.remoteConfig()

module.exports = { remoteConfig }
