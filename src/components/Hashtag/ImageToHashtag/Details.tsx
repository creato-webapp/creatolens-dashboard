import Image from 'next/image'

const Details = (props: { setIsDetailsPageOpen: () => void }) => {
  const { setIsDetailsPageOpen } = props
  return (
    <div className="">
      <div className="flex gap-4">
        <div className="required relative h-6 w-6 items-center justify-center px-4 text-center text-2xl text-black" onClick={setIsDetailsPageOpen}>
          <Image src={'/back.svg'} fill alt={'back'} />
        </div>
        <h1 className="font-extrabold">DETAILS</h1>
      </div>
      <div className="relative aspect-square w-full">
        <Image src={'/turtorial.png'} fill alt={'image to hashtag tutorial'} />
      </div>
      <div className="flex flex-col gap-4">
        <h3 className="font-extrabold">Create compelling content for your next post using generative AI with LENS.</h3>
        <h4 className="font-bold text-text-secondary">Create compelling content for your next post using generative AI with LENS.</h4>
        <h4 className="font-bold text-text-tertiary">Technical support: Google Gemini</h4>
      </div>
    </div>
  )
}

export default Details
