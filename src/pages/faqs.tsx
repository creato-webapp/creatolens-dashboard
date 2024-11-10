import Breadcrumb from '@components/Breadcrumb'
import CaretLeftIcon from '@components/Icon/CaretLeftIcon'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@components/ui/Accordion'

const faqs = [
  {
    heading: 'What is 2TAG used for?',
    content: 'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
  },
  {
    heading: 'Why use 2TAG?',
    content: 'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
  },
  {
    heading: 'Is 2TAG free?',
    content: 'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
  },
  {
    heading: 'How do I get access to Instabot in 2TAG?',
    content: 'Answer the frequently asked question in a simple sentence, a longish paragraph, or even in a list.',
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
          <Breadcrumb lastItemName="FAQ" />
        </div>
        <div className="flex flex-row items-center gap-7 py-4">
          <div className="flex md:hidden">
            <CaretLeftIcon size={20} />
          </div>
          <div className="flex w-full flex-row justify-between">
            <h1 className="py-3 text-heading font-bold text-neutral-800 md:px-16">FAQ</h1>
            {/* <SubtleButton onClick={expandAll}>Expand All</SubtleButton> */}
          </div>
        </div>
        <hr className="my-10 hidden w-full border-t border-neutral-300 first-letter:my-4 md:block" />
        <div className="flex w-full">
          <Accordion type="multiple" defaultValue={['item-1']} className="flex w-full flex-col gap-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index + 1}`}
                className="rounded-lg border px-4 data-[state=closed]:bg-neutral-200 data-[state=closed]:text-neutral-500"
              >
                <AccordionTrigger>{faq.heading}</AccordionTrigger>
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
