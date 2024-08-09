// client side environment
declare namespace NodeJS {
  interface ProcessEnv {
    readonly WORD_EMBEDDING: string
    readonly ACCOUNT_SERVICE: string
    readonly HASHET_SERVICE: string
    readonly MEDIA_SERVICE: string
    readonly SCRAPPER_SERVICE: string
    readonly GEO_CODER_API: string
    readonly DASHBOARD_API: string
    readonly JWT_SECRET: string
    readonly NEXTAUTH_SECRET: string
    readonly NEXTAUTH_URL: string
    readonly LOCAL_SERVER_URL: string
    readonly NEXT_PUBLIC_LOCAL_SERVER_URL: string
    readonly NEXT_PUBLIC_REGISTER_URL: string
    readonly GOOGLE_CLIENT_ID: string
    readonly GOOGLE_CLIENT_SECRET: string
    readonly GOOGLE_REFRESH_TOKEN: string
    readonly FIREBASE_API_KEY: string
    readonly FIREBASE_AUTH_DOMAIN: string
    readonly FIREBASE_DATABASE_URL: string
    readonly FIREBASE_PROJECT_ID: string
    readonly FIREBASE_STORAGE_BUCKET: string
    readonly FIREBASE_MESSAGING_SENDER_ID: string
    readonly FIREBASE_APP_ID: string
  }
}
