import common from '../../public/locales/en/common.json'
import error from '../../public/locales/en/error.json'
// import footer from '../../public/locales/en/footer.json'

const LOCALE = {
  common,
  error,
  // footer,
} as const

export const LOCAL_NAME_SPACE = Object.keys(LOCALE)

export const LANGUAGE = ['en', 'zh-HK']

export default LOCALE
