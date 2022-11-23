import NextAuth from 'next-auth/next'
import { User } from 'next-auth'
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
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, token }) {
      // console.log({ session, token })
      return { ...session, token: token, user: token.user as User } // The return type will match the one returned in `useSession()`
    },
    async jwt({ token, user, account, profile }) {
      // console.log({ token, user, account, profile })
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && user) {
        token.accessToken = account.access_token
        token.user = user
      }
      return token
    },
  },
})
