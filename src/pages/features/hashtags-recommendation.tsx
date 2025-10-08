import PrimaryButton from '@components/Button/Primary'
import FeatureLayout, { Card, Session } from '@components/FeatureLayout'
import SearchIcon from '@components/Icon/SearchIcon'
import useAuth from '@hooks/useAuth'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HashtagsRecommendation = () => {
  const { onLogin } = useAuth()
  const { t } = useTranslation('features')

  return (
    <FeatureLayout heading={t('hashtags_recommendation.heading')}>
      <Card
        image="/hashtag/hashtags-recommendation.png"
        heading={t('hashtags_recommendation.card.heading')}
        subheading={t('hashtags_recommendation.card.subheading')}
        description={t('hashtags_recommendation.card.description')}
        buttonUrl="#"
        onLearnMore={onLogin}
      />
      <Session
        heading={t('hashtags_recommendation.session.heading')}
        items={[t('hashtags_recommendation.session.items.data_backed'), t('hashtags_recommendation.session.items.specific_terms')]}
      >
        <div className="flex w-full items-center justify-center pt-6">
          <div className="w-80 ">
            <PrimaryButton sizes={['l', 'l', 'l']} className="" onClick={onLogin}>
              {t('hashtags_recommendation.get_hashtag_now')}
            </PrimaryButton>
          </div>
        </div>
      </Session>
      <div>
        <h2 className="text-heading text-neutral-800">{t('hashtags_recommendation.explore_heading')}</h2>
        <h3 className="pt-2 text-lg text-neutral-500">{t('hashtags_recommendation.explore_subheading')}</h3>

        <div className="mt-12 w-80 max-w-full">
          <PrimaryButton sizes={['l', 'l', 'l']} onClick={onLogin}>
            <SearchIcon />
            {t('hashtags_recommendation.look_for_hashtag')}
          </PrimaryButton>
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

export default HashtagsRecommendation
