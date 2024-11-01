import PrimaryButton from '@components/Button/Primary'
import FeatureLayout, { Card, Guide, NumberedList } from '@components/FeatureLayout'

const ImageToHashtags = () => {
  return (
    <FeatureLayout heading={'Image-to-Hashtags'}>
      <Card
        image="/hashtag/image-to-hashtags.png"
        heading="Transforms Captivating Images into Hashtags"
        subheading="Enhance your content with trending, targeted data-backed keywords for maximum impact."
        description={`Not sure which keywords to use in your social media post? We've got you covered! Simply upload your image to 2TAG, and our platform will analyze it to generate data-driven hashtags tailored for your content. Optimize your posts and boost visibility with algorithm-friendly keywords.`}
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

export default ImageToHashtags
