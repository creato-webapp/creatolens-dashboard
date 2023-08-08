import NextAuth from 'next-auth/next'
import { User, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { FireStoreAdapterWrapper } from 'services/customAdapter'
import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore/lite'

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

interface CombinedUser extends User {
  emailVerified: boolean
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
  adapter: FireStoreAdapterWrapper(firebaseConfig),
  secret: process.env.JWT_SECRET,
  session: { strategy: 'jwt' },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const app = initializeApp(firebaseConfig)
      const db = getFirestore(app)
      const combinedUser = user as CombinedUser
      const isNew = await isNewUser(db, user.email)

      console.log({ user, account, profile, email, credentials })

      if (isNew) {
        const res = createUserInDatabase(db, user)
        console.log(res)
        return false
      } else if (combinedUser.emailVerified !== true) {
        return false
      }
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

async function createUserInDatabase(db: any, user: any) {
  try {
    // Define the data you want to store for the new user
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      emailVerified: false,
    }

    // Add the user data to the "users" collection
    const usersCollection = collection(db, 'users')
    const newUserRef = await addDoc(usersCollection, userData)

    console.log('User created with ID:', newUserRef.id)
    return true // Return true to indicate success
  } catch (error) {
    console.error('Error creating user:', error)
    return false // Return false to indicate failure
  }
}

async function isNewUser(db: any, userEmail: any) {
  try {
    // Create a query to check if the user's email exists in the "users" collection
    const usersCollection = collection(db, 'users')
    const emailQuery = query(usersCollection, where('email', '==', userEmail))

    // Execute the query and check the results
    const querySnapshot = await getDocs(emailQuery)
    const userExists = !querySnapshot.empty

    return !userExists // Return true if the user is new, false if they already exist
  } catch (error) {
    console.error('Error checking user existence:', error)
    return false // Return false in case of an error
  }
}
