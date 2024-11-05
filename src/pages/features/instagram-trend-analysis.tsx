import FeatureLayout, { Card, Guide, Session } from '@components/FeatureLayout'

const InstagramTrendAnalysis = () => {
  return (
    <FeatureLayout heading={'Instagram Trend Analysis'}>
      <Card
        image="/hashtag/analysis.png"
        heading="Next-level Trend Tracer. Now in 2TAG"
        subheading="From up-to-date hashtags to topics, Trend Analysis can help you quickly realize the current market trend pattern."
        description="Trend Analysis lets you monitor and manage scraped posts from the past 3 or 7 days, tracking activity by topic after pairing Instabot with your 2TAG account."
        buttonUrl="#"
      />
      <Session
        heading="What data can be seen in the trend report"
        items={[
          'Post scrapped (How many post Instabot was working with in past selected period)',
          'Top 10 keywords with most appearance in IG algorithm within 3 days or 7 days',
          "Most repeated posts on Instagram indicate content that captures the algorithm's attention, hence to take reference for your post.",
        ]}
      />
      <Guide
        heading="How to use Instagram Trend Analysis in 2TAG"
        subheading="Make your own trend analysis dashboard with us."
        items={[
          {
            heading: 'Connect Instabot with us',
            content: 'Create a new Instabot for specific niche in your IG can help us customize your trend report',
          },
          {
            heading: '3/7 days report',
            content: 'We will keep making trend data for you in 3 or 7 days',
          },
        ]}
        button={{
          name: 'Make Trend Report Now',
          url: '',
        }}
      />
    </FeatureLayout>
  )
}

export default InstagramTrendAnalysis
