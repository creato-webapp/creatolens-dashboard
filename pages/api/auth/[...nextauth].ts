import NextAuth from 'next-auth/next'
import { User, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { FireStoreAdapterWrapper } from 'services/customAdapter'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next'

import axios from 'axios'
type NextAuthOptionsCallback = (req: NextApiRequest, res: NextApiResponse) => NextAuthOptions

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
interface AuthToken {
  user: User
  accessToken: string
  accessTokenExpires?: number
  expires_at?: number
  refreshToken: string
  error?: string
}

export interface CombinedUser extends User {
  emailVerified: boolean
  roles: string[]
}

async function refreshAccessToken(token: AuthToken) {
  try {
    const url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })
    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_at * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  appId: process.env.FIREBASE_APP_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
}

const nextAuthOptions: NextAuthOptionsCallback = (req, res) => ({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
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
    async signIn({ user, account, profile, email, credentials }) {
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
      // console.log({ session, token })
      return { ...session, token: token, user: token.user as User } // The return type will match the one returned in `useSession()`
    },
    async jwt({ token, user, account, profile }) {
      // console.log({ token, user, account, profile })
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

export default (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res))
}
