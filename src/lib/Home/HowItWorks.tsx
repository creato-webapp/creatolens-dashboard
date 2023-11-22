import Card from '@components/Card'
import React, { HTMLAttributes } from 'react'

interface HowItWorksProps extends HTMLAttributes<HTMLDivElement> {}

const HowItWorks = (props: HowItWorksProps) => {
  const stepList = [
    { title: 'Connect an empty IG account as bot', description: 'Create Insta-bot with several topics/ interests you care about' },
    { title: 'Type in keywords for searches', description: 'Input a 5-8 words about your content for our AI model' },
    { title: 'Hashtag suggestions', description: 'Generate hashtag trends to use in social media' },
  ]

  return (
    <>
      <h1 className="hidden text-center text-[2.125rem] font-extrabold text-text-secondary md:my-8 md:block">How It Works?</h1>
      <div className={`${props.className} flex flex-col items-center space-y-8 py-1 md:flex-row md:justify-center md:space-y-0 md:space-x-4`}>
        <h1 className="space-x-4 text-center text-[2.125rem] font-extrabold text-text-secondary md:hidden">How It Works?</h1>
        {stepList.map((e, index) => (
          <Card
            className="w-[24rem] md:h-[12rem] md:w-auto md:max-w-[26rem]"
            customTitle={<h3 className="pt-2 text-center text-text-secondary">{e.title}</h3>}
          >
            <div
              className={`absolute flex h-10 w-10 -translate-y-11 rotate-45 transform flex-col items-center justify-center gap-1.5 self-center rounded ${
                index === 0 ? 'bg-accent1-500' : index === 1 ? 'bg-accent2-500' : index === 2 ? 'bg-successful-500' : 'bg-white'
              }`}
            >
              <div className="-rotate-45 font-['Lato'] text-2xl font-extrabold leading-loose tracking-wide text-white">{index + 1}</div>
            </div>
            <h4 className="text-center text-text-secondary">{e.description}</h4>
          </Card>
        ))}
      </div>
    </>
  )
}

export default HowItWorks
