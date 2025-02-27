import FeatureLayout, { Card, Guide, Session } from '@components/FeatureLayout'
import useAuth from '@hooks/useAuth'

const Instabot = () => {
  const { onLogin } = useAuth()

  return (
    <FeatureLayout heading={'Instabot'}>
      <Card
        image="/hashtag/analysis.png"
        video="/features/instabot-video.mp4"
        heading="What is Instabot?"
        subheading="Train a personal ai on your data and make images in your style in seconds."
        description="Instabot acts as a real Instagram user, scraping explore page posts to collect data. It builds a shared library, allowing users to access both personal and collective information."
        buttonUrl="#"
        onLearnMore={onLogin}
      />
      <Session
        heading="Using Instabot for even more convenience"
        items={[
          'Customize the followed niche of your account',
          'Full access of customized Instagram trend analysis reports',
          'Contribute your ai model to community library',
        ]}
      />
      <Guide
        heading="How to open and connect an Instabot"
        subheading="Make your own ai model in around 10 minutes."
        items={[
          {
            heading: 'Create an Instagram account',
            content: 'Create a new Instagram account in your device',
          },
          {
            heading: 'Follow niche',
            content: 'Follow other interested pages as you use Instagram as usual. We will take that area as your category for the Instabot.',
          },
          {
            heading: 'Connect Insta-bot with us',
            content: 'Enter your details for the Instagram account in our system. Wait for a moment for the Instabot to run. You are all set.',
          },
        ]}
        button={{
          name: 'Create Instabot Now',
          url: '',
          onClick: onLogin,
        }}
      />
    </FeatureLayout>
  )
}

export default Instabot
