import Breadcrumb from '@components/Breadcrumb'
import CaretLeftIcon from '@components/Icon/CaretLeftIcon'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@components/ui/Accordion'
import router from 'next/router'

const faqs = [
  {
    heading: 'Will social media platforms detect if I’m using AI and reduce my post’s promotion?',
    content:
      "It depends on the platform and its AI policies, but don’t worry—2Tag’s hashtags are data-backed and open source, which means they’re fully available on social media and won't trigger any AI detection issues.",
  },
  {
    heading: 'Will using the 2Tag Instabot cause my personal information to be leaked?',
    content:
      'Nope! The Instabot is only used for customizing trend analysis and hashtag recommendations. We don’t collect any personal info, so just avoid sharing anything sensitive like your ID with your Instabot account. Your privacy’s safe with us!',
  },
  {
    heading: 'What do I need to download or prepare before using 2Tag?',
    content:
      'Nothing too complicated! You don’t need to be tech-savvy to use 2Tag—it’s super easy and available on all devices, including mobile and desktop. We’ve designed it to be intuitive and user-friendly.',
  },
  {
    heading: 'How can I use 2Tag on Instagram?',
    content: 'It’s simple! Just copy the hashtags we recommend, then paste them under your post like you usually would.',
  },
  {
    heading: 'Will the results work with my Instagram account?',
    content:
      'Absolutely! 2Tag’s hashtags are optimized for Instagram’s algorithm, based on your account data. This means the hashtags are perfectly tailored to your content and audience, helping you get the most engagement possible!',
  },
]
const FAQPage = () => {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.heading,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.content,
      },
    })),
  }

  return (
    <div className="flex w-full flex-col items-center px-6 ">
      <script suppressHydrationWarning type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <div className="w-full max-w-screen-2xl ">
        <div className="hidden md:flex">
          <Breadcrumb lastItemName="FAQs" />
        </div>
        <div className="flex flex-row items-center gap-7 py-4">
          <div className="flex cursor-pointer md:hidden" onClick={() => router.push('/')}>
            <CaretLeftIcon size={20} />
          </div>
          <div className="flex w-full flex-row justify-between">
            <h1 className="py-3 text-heading font-bold md:px-16">FAQs</h1>
            {/* <SubtleButton onClick={expandAll}>Expand All</SubtleButton> */}
          </div>
        </div>
        <hr className="my-10 hidden w-full border-t first-letter:my-4 md:block" />
        <div className="flex w-full">
          <Accordion type="multiple" defaultValue={['item-1']} className="flex w-full flex-col gap-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="rounded-lg border px-4 data-[state=closed]:bg-neutral-200 data-[state=closed]:text-neutral-500 dark:border-[#444444] dark:data-[state=closed]:bg-[#2C2C2C] dark:data-[state=closed]:text-white"
              >
                <AccordionTrigger className="">{faq.heading}</AccordionTrigger>
                <AccordionContent>{faq.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  )
}
export default FAQPage
