import { setCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextAuthOptions, User } from 'next-auth/index'
import NextAuth from 'next-auth/next'
import GoogleProvider from 'next-auth/providers/google'

import { FireStoreAdapterWrapper, FirebaseConfig } from '@services/customAdapter'


type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

export interface CombinedUser extends User {
  emailVerified: boolean
  roles: string[]
}

function getFirebaseConfig(): FirebaseConfig {
  const config: FirebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY!,
    appId: process.env.FIREBASE_APP_ID!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  }

  for (const [key, value] of Object.entries(config)) {
    if (key !== 'databaseURL' && value === undefined) {
      throw new Error(`Missing environment variable for ${key}`)
    }
  }

  return config
}

const firebaseConfig = getFirebaseConfig()

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          // prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: 'openid email profile',
        },
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/guide',
  },
  adapter: FireStoreAdapterWrapper(firebaseConfig),
  secret: process.env.JWT_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ account }) {
      if (account?.id_token) {
        setCookie('idToken', account.id_token, {
          req: req,
          res: res,
        })
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async session({ session, token }) {
      return { ...session, token: token, user: token.user as User } // The return type will match the one returned in `useSession()`
    },
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account && user) {
        token.accessToken = account.access_token
        token.idToken = account.id_token
        token.expires_at = Date.now()
        //TODO refresh Token
        token.user = user
      }
      return token
    },
  },
})

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}

export default authHandler
