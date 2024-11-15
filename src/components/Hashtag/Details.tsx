import Image from 'next/image'

const Details = (props: { setIsDetailsPageOpen: () => void }) => {
  const { setIsDetailsPageOpen } = props
  return (
    <div className="md:max-w-128">
      <div className="flex items-center gap-4">
        <div
          className="required relative flex h-6 w-6 cursor-pointer items-center justify-center px-4 text-center text-2xl text-black"
          onClick={setIsDetailsPageOpen}
        >
          <Image src={'/back.svg'} fill alt={'back'} />
        </div>
        <h1 className="font-extrabold">DETAILS</h1>
      </div>
      <div className="relative aspect-square w-full">
        <Image src={'/turtorial.png'} fill alt={'image to hashtag tutorial'} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="text-2xl font-bold">Create compelling content for your next post using generative AI with 2Tag.</h3>
        <h4 className="text-base text-text-secondary">
          Providing easy description, copyright free image can be generated easily. Also upload images to extract data-based hashtags effortlessly
          from 2Tag.
        </h4>
        <h4 className="text-base text-text-secondary">
          Harness the power of 2Tag hashtag and label features to create more engaging images cater for social media algorithms.
        </h4>
        <h4 className="text-sm text-text-tertiary">Technical support: Google Gemini</h4>
      </div>
    </div>
  )
}

export default Details
