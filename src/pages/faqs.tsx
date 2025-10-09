import Breadcrumb from '@components/Breadcrumb'
import CaretLeftIcon from '@components/Icon/CaretLeftIcon'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@components/ui/Accordion'
import router from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'

const FAQPage = () => {
  const { t } = useTranslation('faq')

  const faqs = [
    {
      heading: t('questions.q1.question'),
      content: t('questions.q1.answer'),
    },
    {
      heading: t('questions.q2.question'),
      content: t('questions.q2.answer'),
    },
    {
      heading: t('questions.q3.question'),
      content: t('questions.q3.answer'),
    },
    {
      heading: t('questions.q4.question'),
      content: t('questions.q4.answer'),
    },
    {
      heading: t('questions.q5.question'),
      content: t('questions.q5.answer'),
    },
  ]

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
          <Breadcrumb lastItemName={t('breadcrumb')} />
        </div>
        <div className="flex flex-row items-center gap-7 py-4">
          <div className="flex cursor-pointer md:hidden" onClick={() => router.push('/')}>
            <CaretLeftIcon size={20} />
          </div>
          <div className="flex w-full flex-row justify-between">
            <h1 className="py-3 text-heading font-bold text-neutral-800 md:px-16">{t('page_title')}</h1>
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

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['layout', 'common', 'faq'])),
  },
})

export default FAQPage
