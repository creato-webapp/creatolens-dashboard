import Image from 'next/image'
import PrimaryButton from './Button/Primary'
import router from 'next/router'
import Breadcrumb from './Breadcrumb'
import CaretLeftIcon from './Icon/CaretLeftIcon'

interface IFeatureCard {
  image: string
  heading: string
  subheading: string
  description: string
  buttonUrl: string
  video?: string
}

interface IFeatureBulletPoint {
  heading: string
  items: string[]
  children?: React.ReactNode
}

interface IGuide {
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

interface INumberedList {
  heading: string
  list: { heading: string; content: string }[]
}
interface IFeatureLayout {
  heading?: string
  card?: IFeatureCard
  session?: IFeatureBulletPoint
  guide?: IGuide
  children?: React.ReactNode
}

export const Card = (props: IFeatureCard) => {
  const { video, heading, subheading, description, buttonUrl, image } = props
  return (
    <div className="card flex w-full flex-col gap-8 pb-6 md:flex-row md:pb-16 md:pt-8">
      <div className="relative w-full md:h-80">
        {video ? (
          <video className="h-full object-cover" controls autoPlay>
            <source src={video} type="video/mp4" />
          </video>
        ) : (
          <Image src={image || '/logo_orange.png'} style={{ objectFit: 'contain' }} alt={heading} fill quality={100} unoptimized />
        )}
      </div>
      <div className="flex w-full flex-col justify-between gap-6">
        <div>
          <h2 className="text-heading text-neutral-800">{heading}</h2>
          <h3 className="pt-2 text-subheading text-neutral-500">{subheading}</h3>
          <p className="pt-6 text-base text-neutral-800">{description}</p>
        </div>
        <PrimaryButton sizes={['m', 'm', 'm']} className="w-full md:!w-80" onClick={() => router.push(buttonUrl)}>
          Learn More
        </PrimaryButton>
      </div>
    </div>
  )
}

export const Session = (props: IFeatureBulletPoint) => {
  const { heading, items, children } = props
  return (
    <div className="session py-6 md:py-16">
      <h2 className="text-heading text-neutral-800">{heading}</h2>
      <ul className="pl-6 pt-6">
        {items &&
          items.map((item: string, index: number) => (
            <li key={index} className="list-disc text-neutral-500 md:pl-5">
              {item}
            </li>
          ))}
      </ul>
      {children}
    </div>
  )
}

export const Guide = (props: IGuide) => {
  const { heading, subheading, items, button } = props
  return (
    <div className="guide flex w-full flex-col gap-12 py-6 md:py-16">
      <div>
        <h2 className="text-heading">{heading}</h2>
        <h3 className="pt-2 text-subheading text-neutral-500">{subheading}</h3>
      </div>
      <div className="flex flex-row flex-wrap justify-between gap-6">
        {items.map((item: { heading: string; content: string }, index: number) => (
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
        <div className="w-full md:w-80">
          <PrimaryButton sizes={['l', 'l', 'l']} onClick={() => router.push(button.url)}>
            {button.name}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export const NumberedList = (props: INumberedList) => {
  const { heading, list } = props
  return (
    <div>
      <h2 className="text-heading text-neutral-800">{heading}</h2>
      <ol className="flex flex-col gap-4 pt-6 text-neutral-500">
        {list &&
          list.map((item, index) => (
            <li key={index}>
              <strong>{item.heading}</strong>: {item.content}
            </li>
          ))}
      </ol>
    </div>
  )
}

const FeatureLayout = (props: IFeatureLayout) => {
  return (
    <div className="feature-layout flex w-full flex-col items-center pb-12">
      <div className="flex w-full flex-col gap-6 px-6 lg:max-w-screen-2xl">
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
          </div>
        </div>
        {props.children}
      </div>
    </div>
  )
}

export default FeatureLayout
