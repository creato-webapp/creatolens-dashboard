import PrimaryButton from '@components/Button/Primary'
import FeatureLayout, { Card, Guide, NumberedList } from '@components/FeatureLayout'
import useAuth from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HashtagsToImage = () => {
  const { onLogin } = useAuth()
  const { t } = useTranslation('features')

  return (
    <FeatureLayout heading={t('hashtags_to_image.heading')}>
      <Card
        image="/hashtag/hashtags-to-image.png"
        heading={t('hashtags_to_image.card.heading')}
        subheading={t('hashtags_to_image.card.subheading')}
        description={t('hashtags_to_image.card.description')}
        buttonUrl="#"
        onLearnMore={onLogin}
      />

      <Guide
        heading={t('hashtags_to_image.guide.heading')}
        subheading={t('hashtags_to_image.guide.subheading')}
        items={[
          {
            heading: t('hashtags_to_image.guide.step1.heading'),
            content: t('hashtags_to_image.guide.step1.content'),
          },
          {
            heading: t('hashtags_to_image.guide.step2.heading'),
            content: t('hashtags_to_image.guide.step2.content'),
          },
          {
            heading: t('hashtags_to_image.guide.step3.heading'),
            content: t('hashtags_to_image.guide.step3.content'),
          },
        ]}
        button={{
          name: t('hashtags_to_image.guide.button'),
          url: '',
          onClick: onLogin,
        }}
      />
      <div className="py-16">
        <NumberedList
          heading={t('hashtags_to_image.benefits.heading')}
          list={[
            {
              heading: t('hashtags_to_image.benefits.improve_reach.heading'),
              content: t('hashtags_to_image.benefits.improve_reach.content'),
            },
            {
              heading: t('hashtags_to_image.benefits.enhance_relevance.heading'),
              content: t('hashtags_to_image.benefits.enhance_relevance.content'),
            },
            {
              heading: t('hashtags_to_image.benefits.save_time.heading'),
              content: t('hashtags_to_image.benefits.save_time.content'),
            },
            {
              heading: t('hashtags_to_image.benefits.remove_guesswork.heading'),
              content: t('hashtags_to_image.benefits.remove_guesswork.content'),
            },
          ]}
        />
        <div className="flex w-full justify-center pt-6">
          <div className="w-full md:w-80 ">
            <PrimaryButton sizes={['l', 'l', 'l']} onClick={onLogin}>
              {t('hashtags_to_image.get_hashtag_now')}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </FeatureLayout>
  )
}

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['features', 'common'])),
  },
})

export default HashtagsToImage
