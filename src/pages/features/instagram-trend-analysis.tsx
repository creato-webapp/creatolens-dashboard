import FeatureLayout, { Card, Guide, Session } from '@components/FeatureLayout'
import useAuth from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const InstagramTrendAnalysis = () => {
  const { onLogin } = useAuth()
  const { t } = useTranslation('features')

  return (
    <FeatureLayout heading={t('instagram_trend_analysis.heading')}>
      <Card
        image="/hashtag/analysis.png"
        heading={t('instagram_trend_analysis.card.heading')}
        subheading={t('instagram_trend_analysis.card.subheading')}
        description={t('instagram_trend_analysis.card.description')}
        buttonUrl="#"
        onLearnMore={onLogin}
      />
      <Session
        heading={t('instagram_trend_analysis.session.heading')}
        items={[
          t('instagram_trend_analysis.session.items.post_scrapped'),
          t('instagram_trend_analysis.session.items.top_keywords'),
          t('instagram_trend_analysis.session.items.most_repeated'),
        ]}
      />
      <Guide
        heading={t('instagram_trend_analysis.guide.heading')}
        subheading={t('instagram_trend_analysis.guide.subheading')}
        items={[
          {
            heading: t('instagram_trend_analysis.guide.step1.heading'),
            content: t('instagram_trend_analysis.guide.step1.content'),
          },
          {
            heading: t('instagram_trend_analysis.guide.step2.heading'),
            content: t('instagram_trend_analysis.guide.step2.content'),
          },
        ]}
        button={{
          name: t('instagram_trend_analysis.guide.button'),
          url: '',
          onClick: onLogin,
        }}
      />
    </FeatureLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['features', 'common'])),
  },
})

export default InstagramTrendAnalysis
