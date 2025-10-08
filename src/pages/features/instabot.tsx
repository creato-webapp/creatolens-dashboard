import FeatureLayout, { Card, Guide, Session } from '@components/FeatureLayout'
import useAuth from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const Instabot = () => {
  const { onLogin } = useAuth()
  const { t } = useTranslation('features')

  return (
    <FeatureLayout heading={t('instabot.heading')}>
      <Card
        image="/hashtag/analysis.png"
        video="/features/instabot-video.mp4"
        heading={t('instabot.card.heading')}
        subheading={t('instabot.card.subheading')}
        description={t('instabot.card.description')}
        buttonUrl="#"
        onLearnMore={onLogin}
      />
      <Session
        heading={t('instabot.session.heading')}
        items={[t('instabot.session.items.customize_niche'), t('instabot.session.items.full_access'), t('instabot.session.items.contribute')]}
      />
      <Guide
        heading={t('instabot.guide.heading')}
        subheading={t('instabot.guide.subheading')}
        items={[
          {
            heading: t('instabot.guide.step1.heading'),
            content: t('instabot.guide.step1.content'),
          },
          {
            heading: t('instabot.guide.step2.heading'),
            content: t('instabot.guide.step2.content'),
          },
          {
            heading: t('instabot.guide.step3.heading'),
            content: t('instabot.guide.step3.content'),
          },
        ]}
        button={{
          name: t('instabot.guide.button'),
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

export default Instabot
