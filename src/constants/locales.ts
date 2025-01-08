import common from '../../public/locales/en/common.json'
import error from '../../public/locales/en/error.json'
import seo from '../../public/locales/en/seo.json'
import hashtag from '../../public/locales/en/hashtag.json'
// import footer from '../../public/locales/en/footer.json'

const LOCALE = {
  common,
  error,
  seo,
  hashtag,
  // footer,
} as const

export const LOCAL_NAME_SPACE = Object.keys(LOCALE)

export const LANGUAGE = ['en', 'zh-HK']

export default LOCALE
