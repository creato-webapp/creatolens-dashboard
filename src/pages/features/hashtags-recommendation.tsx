import PrimaryButton from '@components/Button/Primary'
import FeatureLayout, { Card, Session } from '@components/FeatureLayout'
import SearchIcon from '@components/Icon/SearchIcon'

const HashtagsRecommendation = () => {
  return (
    <FeatureLayout heading={'Hashtags Recommendation'}>
      <Card
        image="/hashtag/hashtags-recommendation.png"
        heading="Meet Hashtags Recommendation model powered by 2TAG."
        subheading="Using text prompts, quickly transform post ideas into data-backed hashtag to make your post become popular. "
        description="Generate data-backed hashtag to add under your post. Enhancing your post content to be seen under the algorithm of Instagram"
        buttonUrl="#"
      />
      <Session
        heading="Why use our hashtags?"
        items={[
          'Hashtags are all backed by data to help boost engagement for posts, unlike other AI product.',
          'Specific terms and keywords are provided without the need for time-consuming searches.',
        ]}
      >
        <div className="flex w-full items-center justify-center pt-6">
          <div className="w-80 ">
            <PrimaryButton sizes={['l', 'l', 'l']} className="">
              Get Hashtag Now
            </PrimaryButton>
          </div>
        </div>
      </Session>
      <div>
        <h2 className="text-heading text-neutral-800">Explore the Hashtag possibilities</h2>
        <h3 className="pt-2 text-lg text-neutral-500">Look up to the free to use Hashtag set from 2TAG and make good use for your post </h3>

        <div className="mt-12 w-80 max-w-full">
          <PrimaryButton sizes={['l', 'l', 'l']}>
            <SearchIcon />
            Look for Hashtag
          </PrimaryButton>
        </div>
      </div>
    </FeatureLayout>
  )
}

export default HashtagsRecommendation
