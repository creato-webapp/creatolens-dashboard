// TestimonialCards.tsx
import React from 'react'
interface Comment {
  img?: string
  author: string
  text: string
  title: string
  subtitle?: string
  orangeText?: string
}

interface TestimonialCardsProps {
  comments?: Comment[]
}

const testimonial = [
  {
    author: 'Avenna Hui',
    text: '“I was able to *get 5,000+ organic impressions* based on the hashtags recommendation”',
    title: 'Travel YouTuber with 3.95K↑ view',
    img: '/userAvenna.jpeg',
  },
  {
    author: 'Andy Ho',
    text: '“Impression rates *grew more than 20%* from the hashtag category after 3 time usages in a row. ”',
    title: 'Wedding Photographer',
    img: './userJacky.jpeg',
  },
  {
    author: 'Ewen Cheuk',
    text: '“A great tool for us to *get more viewers* for our video content on social media.”',
    title: 'KOL with 30K↑ followers on Instagram',
    img: '/userJessica.jpeg',
  },
]

const TestimonialCards: React.FC<TestimonialCardsProps> = ({ comments = testimonial }: TestimonialCardsProps) => {
  const formatText = (text: string) => {
    const parts = text.split(/\*(.*?)\*/g)
    return parts.map((part, index) =>
      index % 2 === 1 ? (
        <strong className="font-bold" key={index}>
          {part}
        </strong>
      ) : (
        part
      )
    )
  }

  return (
    <div className="flex w-full justify-center py-10">
      <div className="max-w-screen-xl ">
        <h2 className="mb-14 flex flex-col">
          <span className="text-heading"> Loved & trusted by +500,000 users. </span>
          <span className="text-subheading text-neutral-500">Content creators, Digital marketers, and more</span>
        </h2>
        <div id="testimonial-list" className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {comments?.map((comment, index) => (
            <div
              key={index}
              className="flex h-full flex-col rounded-lg border border-neutral-300 bg-white p-4"
              style={{ minHeight: '250px' }} // Set a minimum height
            >
              <h4 className="m-2 flex-grow flex-wrap text-ellipsis text-heading font-normal text-neutral-800">{formatText(comment.text)}</h4>
              <div className="mx-4 flex flex-row items-center gap-4">
                {comment.img ? (
                  <img src={comment.img} alt={comment.author} className="h-10 w-10 shrink-0 rounded-full object-cover object-center" />
                ) : (
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-600">
                    <svg
                      className="absolute -bottom-1 h-6 w-6 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                )}
                <div className="flex flex-col justify-between">
                  <strong className="text-neutral-500">{comment.author}</strong>
                  <h4 className="w-auto text-base font-normal text-disabled">{comment.title}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialCards
