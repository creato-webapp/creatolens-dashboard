import Image from 'next/image'
import PrimaryButton from './Button/Primary'
import router from 'next/router'
import Breadcrumb from './Breadcrumb'
import CaretLeftIcon from './Icon/CaretLeftIcon'

interface IFeatureLayout {
  heading: string
  card: {
    image: string
    heading: string
    subheading: string
    description: string
    buttonUrl: string
  }
  session: {
    heading: string
    items: string[]
  }
  guide: {
    heading: string
    subheading: string
    items: {
      heading: string
      content: string
    }[]
    button: {
      name: string
      url: string
    }
  }
}

const FeatureLayout = (props: IFeatureLayout) => {
  return (
    <div className="feature-layout flex w-full flex-col pb-12">
      <div className="flex flex-col gap-6 px-6 lg:max-w-screen-xl">
        <div className="hidden md:flex">
          <Breadcrumb lastItemName={props.heading} />
        </div>
        <div className="flex flex-col gap-12 md:gap-32 ">
          <div className="flex w-full flex-col">
            <div>
              <div className="flex flex-row items-center gap-7">
                <div className="flex md:hidden">
                  <CaretLeftIcon size={20} />
                </div>
                <h1 className="py-3 text-heading font-bold text-neutral-800 md:px-16">{props.heading}</h1>
              </div>
              <hr className="my-10 hidden w-full border-t border-neutral-300 first-letter:my-4 md:block" />
            </div>
            <div className="card flex w-full flex-col  gap-8 md:flex-row">
              <div className="relative aspect-video w-full">
                <Image src={props.card.image || '/logo_orange.png'} objectFit="contain" fill alt={props.card.heading} />
              </div>
              <div className="flex w-full flex-col justify-between gap-6">
                <div className="">
                  <h2 className="text-heading text-neutral-800">{props.card.heading}</h2>
                  <h3 className="pt-2 text-subheading text-neutral-500">{props.card.subheading}</h3>
                  <p className="pt-6 text-base text-neutral-800">{props.card.description}</p>
                </div>
                <PrimaryButton sizes={['m', 'm', 'm']} className="w-full md:!w-80" onClick={() => router.push(props.card.buttonUrl)}>
                  Learn More
                </PrimaryButton>
              </div>
            </div>
          </div>
          <div className="session">
            <h2 className="text-heading text-neutral-800">{props.session.heading}</h2>
            <ul className="pl-6 pt-6">
              {props.session.items.map((item, index) => (
                <li key={index} className="list-disc text-neutral-500 md:pl-5">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="guide flex w-full flex-col gap-12">
            <div>
              <h2 className="text-heading">{props.guide.heading}</h2>
              <h3 className="pt-2 text-subheading text-neutral-500">{props.guide.subheading}</h3>
            </div>
            <div className="flex flex-row flex-wrap justify-between gap-6">
              {props.guide.items.map((item, index) => (
                <div key={index} className="md:flex-1">
                  <div className="flex w-full flex-row gap-6">
                    <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full border-2 border-neutral-800">
                      <span className="text-neutral-800">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="text-heading text-neutral-800">{item.heading}</h4>
                      <p className="pt-2 text-neutral-500">{item.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex w-full items-center justify-center">
              <PrimaryButton sizes={['m', 'm', 'm']} className="w-full md:w-fit" onClick={() => router.push(props.guide.button.url)}>
                {props.guide.button.name}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeatureLayout
