import PrimaryButton from '@components/Button/Primary'
import FeatureLayout, { Card, Guide, NumberedList } from '@components/FeatureLayout'

const HashtagsToImage = () => {
  return (
    <FeatureLayout heading={'Hashtags-to-Image'}>
      <Card
        image="/hashtag/hashtags-to-image.png"
        heading="AI Image Generator: Create images from hashtag and text."
        subheading="Try new way to prompt the image to make your content visible with AI creation"
        description={`When used Hashtag to Image AI art generator, 2TAG makes creative exploration easier and faster for everyone. Use Text to Image to experiment with your wildest ideas, also AI-backed hashtag, or create eye-catching content in just a few seconds.`}
        buttonUrl="#"
      />

      <Guide
        heading="How to generate hashtag?"
        subheading="Get hashtags for your image in 3 steps."
        items={[
          {
            heading: 'Upload Image',
            content: 'Upload any image you like to 2Tag',
          },
          {
            heading: 'AI Labeling',
            content: 'AI will analyze what is in the image.',
          },
          {
            heading: 'Get Hashtags',
            content: 'Based on the labels identified, best-fit hashtags will be generated for optimal results.',
          },
        ]}
        button={{
          name: '+  Get Hashtags Now #',
          url: '',
        }}
      />
      <div className="py-16">
        <NumberedList
          heading={'Involve Image-to-Hashtags for digital marketing'}
          list={[
            {
              heading: '1. Improves Reach',
              content: 'By using targeted and trending hashtags, your content becomes more discoverable, expanding its reach to more users.',
            },
            {
              heading: '2. Enhances Relevance',
              content: 'Ensures your hashtags match your image content, attracting a more engaged audience.',
            },
            {
              heading: '3. Saves Time',
              content: 'AI analyzes your image and suggests suitable hashtags instantly, saving time for manually researching.',
            },
            {
              heading: '4. Removes Guesswork',
              content: 'AI takes the uncertainty out of choosing the best hashtags, providing reliable, effective options backed by data.',
            },
          ]}
        />
        <div className="flex w-full justify-center pt-6">
          <div className="w-full md:w-80 ">
            <PrimaryButton sizes={['l', 'l', 'l']}>Get Hashtag Now</PrimaryButton>
          </div>
        </div>
      </div>
    </FeatureLayout>
  )
}

export default HashtagsToImage
