import { useTranslation } from 'next-i18next'
import ROUTE from '@constants/route'

export type NavLink = {
  readonly name: string
  readonly path: string
  readonly disabled: boolean
}

export type MenuSection = {
  readonly header: string
  readonly items: readonly NavLink[]
}

export const useMenuTranslation = () => {
  const { t } = useTranslation('layout')

  const getFeatureLinks = (isStatic = false): readonly NavLink[] => [
    {
      name: t('menu.features.instagram_trend_analysis'),
      path: isStatic ? ROUTE.STATIC_DASHBOARD : ROUTE.DASHBOARD,
      disabled: false,
    },
    {
      name: t('menu.features.instabot'),
      path: isStatic ? ROUTE.STATIC_ACCOUNTS : ROUTE.ACCOUNTS,
      disabled: false,
    },
    // {
    //   name: t('menu.features.hashtags_recommendation'),
    //   path: ROUTE.RECOMMENDATION,
    //   disabled: false,
    // },
    {
      name: t('menu.features.hashtags_to_image'),
      path: isStatic ? ROUTE.STATIC_HASHTAG_TO_IMAGE : ROUTE.HASHTAG_TO_IMAGE,
      disabled: false,
    },
    {
      name: t('menu.features.image_to_hashtags'),
      path: isStatic ? ROUTE.STATIC_IMAGE_TO_HASHTAG : ROUTE.IMAGE_TO_HASHTAG,
      disabled: false,
    },
  ]

  const getSupportLinks = (): readonly NavLink[] => [
    {
      name: t('menu.support.faqs'),
      path: ROUTE.FAQ,
      disabled: false,
    },
    // {
    //   name: t('menu.support.terms_conditions'),
    //   path: ROUTE.TERMS_AND_CONDITIONS,
    //   disabled: false,
    // },
    // {
    //   name: t('menu.support.privacy_policy'),
    //   path: ROUTE.PRIVACY_POLICY,
    //   disabled: false,
    // },
    {
      name: t('menu.support.contact_us'),
      path: ROUTE.CONTACT_US,
      disabled: false,
    },
  ]

  const getResourceLinks = (): readonly NavLink[] => [
    {
      name: t('menu.resources.hashtags_keywords'),
      path: ROUTE.RESOURCE_HASHTAG,
      disabled: false,
    },
    {
      name: t('menu.resources.blog'),
      path: ROUTE.RESOURCE_BLOG,
      disabled: false,
    },
  ]

  const getMenuSections = (isStatic = false): readonly MenuSection[] => [
    {
      header: t('menu.features.header'),
      items: getFeatureLinks(isStatic),
    },
    {
      header: t('menu.support.header'),
      items: getSupportLinks(),
    },
    {
      header: t('menu.resources.header'),
      items: getResourceLinks(),
    },
  ]

  return {
    getFeatureLinks,
    getSupportLinks,
    getResourceLinks,
    getMenuSections,
  }
}
