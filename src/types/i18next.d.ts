/**
 * If you want to enable locale keys typechecking and enhance IDE experience.
 *
 * Requires `resolveJsonModule:true` in your tsconfig.json.
 *
 * @link https://www.i18next.com/overview/typescript
 */
import 'i18next'

// locales.ts file is generated with `npm run toc`
import locales from '@constants/locales'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    locales: typeof locales
  }
}
