import PrimaryButton from '@components/Button/Primary'
import FeatureLayout, { Card, Guide, NumberedList } from '@components/FeatureLayout'
import useAuth from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ImageToHashtags = () => {
  const { onLogin } = useAuth()
  const { t } = useTranslation('features')

  return (
    <FeatureLayout heading={t('image_to_hashtags.heading')}>
      <Card
        image="/hashtag/image-to-hashtags.png"
        heading={t('image_to_hashtags.card.heading')}
        subheading={t('image_to_hashtags.card.subheading')}
        description={t('image_to_hashtags.card.description')}
        buttonUrl="#"
        onLearnMore={onLogin}
      />

      <Guide
        heading={t('image_to_hashtags.guide.heading')}
        subheading={t('image_to_hashtags.guide.subheading')}
        items={[
          {
            heading: t('image_to_hashtags.guide.step1.heading'),
            content: t('image_to_hashtags.guide.step1.content'),
          },
          {
            heading: t('image_to_hashtags.guide.step2.heading'),
            content: t('image_to_hashtags.guide.step2.content'),
          },
          {
            heading: t('image_to_hashtags.guide.step3.heading'),
            content: t('image_to_hashtags.guide.step3.content'),
          },
        ]}
        button={{
          name: t('image_to_hashtags.guide.button'),
          url: '',
          onClick: onLogin,
        }}
      />
      <div className="py-16">
        <NumberedList
          heading={t('image_to_hashtags.benefits.heading')}
          list={[
            {
              heading: t('image_to_hashtags.benefits.improve_reach.heading'),
              content: t('image_to_hashtags.benefits.improve_reach.content'),
            },
            {
              heading: t('image_to_hashtags.benefits.enhance_relevance.heading'),
              content: t('image_to_hashtags.benefits.enhance_relevance.content'),
            },
            {
              heading: t('image_to_hashtags.benefits.save_time.heading'),
              content: t('image_to_hashtags.benefits.save_time.content'),
            },
            {
              heading: t('image_to_hashtags.benefits.remove_guesswork.heading'),
              content: t('image_to_hashtags.benefits.remove_guesswork.content'),
            },
          ]}
        />
        <div className="flex w-full justify-center pt-6">
          <div className="w-full md:w-80 ">
            <PrimaryButton sizes={['l', 'l', 'l']} onClick={onLogin}>
              {t('image_to_hashtags.get_hashtag_now')}
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

export default ImageToHashtags
