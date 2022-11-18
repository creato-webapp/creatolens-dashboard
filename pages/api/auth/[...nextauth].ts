import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'
import { FireStoreAdapterWrapper } from 'services/customAdapter'

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  adapter: FireStoreAdapterWrapper({
    apiKey: process.env.FIREBASE_API_KEY,
    appId: process.env.FIREBASE_APP_ID,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  }),
  secret: process.env.JWT_SECRET,
  callbacks: {
    session({ session, token, user }) {
      return { ...session, user: user } // The return type will match the one returned in `useSession()`
    },
  },
})
