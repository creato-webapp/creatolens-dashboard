import admin, { ServiceAccount } from 'firebase-admin'

const serviceAccount = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
} as ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

export const remoteConfig = admin.remoteConfig()

module.exports = { remoteConfig }
