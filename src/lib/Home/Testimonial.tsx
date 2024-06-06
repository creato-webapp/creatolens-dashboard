// TestimonialCards.tsx
import React from 'react'
interface Comment {
  img?: string
  author: string
  text: string[]
  title: string
  subtitle?: string
  orangeText?: string
}

interface TestimonialCardsProps {
  comments?: Comment[]
}

const testimonial = [
  {
    author: 'Avenna',
    text: ['I was able to ', ' based on the hashtags used by Creato lens! Will use it more often in the future.'],
    title: 'Videographer',
    img: '/userAvenna.jpeg',
    orangeText: 'get 5,000+ organic impressions',
  },
  {
    author: 'Jacky',
    text: ['Tried it for 3 posts in a row, and my impression rates ', '. Great tool to get more exposure.'],
    title: 'Wedding Photographer',
    img: './userJacky.jpeg',
    orangeText: 'grew more than 20% from the hashtag category',
  },
  {
    author: 'Jessica',
    text: ['A great tool for us to ', ' for our video content on social media. Digital marketer should definitely consider trying it!'],
    title: 'Content manager',
    img: '/userJessica.jpeg',
    orangeText: 'get more viewers',
  },
]

const TestimonialCards: React.FC<TestimonialCardsProps> = ({ comments = testimonial }: TestimonialCardsProps) => {
  return (
    <div className="bg-bg-dark py-10">
      <h2 className="m-4 mb-14 text-center md:mx-16">
        <span className="font-extrabold  tracking-wide text-accent1-500">Content Managers</span>
        <span className="font-medium  text-slate-600">, </span>
        <span className="font-extrabold  tracking-wide text-accent1-500">Individual Creators</span>
        <span className="font-medium  text-slate-600">, </span>
        <span className="font-extrabold  tracking-wide text-accent1-500">Digital Marketers</span>
        <span className="font-medium  text-slate-600">, </span>
        <span className="font-extrabold  tracking-wide text-accent1-500">Freelancers</span>
        <span className="font-medium  text-slate-600"> use Creato LENS for running their social media page </span>
      </h2>
      <div className="md:mx-4 md:flex md:flex-row">
        {comments?.map((comment, index) => (
          <div key={index} className="m-4 rounded-lg border border-slate-300 bg-white p-4 text-center shadow-lg">
            <div className="flex items-center space-x-3"></div>
            <h4 className="m-2 font-medium">
              <span>{comment.text[0]}</span>
              <span className="font-extrabold text-accent1-500">{comment.orangeText}</span>
              <span>{comment.text[1]}</span>
            </h4>
            <div className="mx-4 flex flex-row items-center gap-4">
              <>
                {comment.img ? (
                  <img
                    src={comment.img} // Replace with your path to a default avatar image
                    alt={comment.author}
                    className="h-10 w-10 shrink-0 rounded-full object-cover object-center"
                  />
                ) : (
                  <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600 md:h-10 md:w-10">
                    <svg
                      className="absolute -bottom-1 h-6 w-6 text-gray-400 md:h-10 md:w-10"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                )}

                <h3 className="font-extrabold">{comment.author}</h3>
              </>

              <h4 className="ml-auto w-auto font-medium text-text-secondary">{comment.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TestimonialCards
