function getFirebaseConfig() {
  const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  }

  for (const [key, value] of Object.entries(config)) {
    if (key !== 'databaseURL' && value === undefined) {
      throw new Error(`Missing environment variable for ${key}`)
    }
  }

  return config
}

const firebaseConfig = getFirebaseConfig()

export default firebaseConfig
