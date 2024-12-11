import Breadcrumb from '@components/Breadcrumb'
import router from 'next/router'
import { useTranslation } from 'next-i18next'
import PrimaryButton from '@components/Button/Primary'
import { GetStaticPaths, GetStaticProps } from 'next'
import SubtleButton from '@components/Button/Subtle'
import { CopyIcon } from 'lucide-react'

import { fetchHashtagByKeyword, fetchSeoPagePath } from '@services/Seo/Keywords'
import { getLocaleProps } from '@services/locale'
import { Badge } from '@components/ui/Badge'
import useAuth from '@hooks/useAuth'
import { getUniqueSortedHashtags } from '@utils/index'
import { Status } from '@context/DialogueContext'
import { useDialogues } from '@hooks/useDialogues'
import Head from 'next/head'

interface IFeatureBulletPoint {
  heading: string
  description: string
  items: string[]
  children?: React.ReactNode
}

interface IHashtagResponse {
  is_related: { recent: Hashtag[]; older: Hashtag[] }
  most_repeated: { recent: Hashtag[]; older: Hashtag[] }
}

export interface Hashtag {
  category: string
  count: number
  created_at: string
  hashtag: string
  is_recent: false
  is_related: boolean
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
    onClick?: () => void
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await fetchSeoPagePath()
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context
  await getLocaleProps(context)
  const tag = params?.tag as string
  if (!tag) {
    return { notFound: true }
  }

  try {
    const data = await fetchHashtagByKeyword(tag)
    return {
      props: {
        title: tag,
        data: data,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return { notFound: true } // Return 404 if data fetching fails
  }
}

const Hashtags = (props: { hashtags: Hashtag[] | null }) => {
  const { t } = useTranslation('seo')
  const { addDialogue } = useDialogues()
  const { hashtags } = props

  if (!hashtags) return <></>

  const copyToClipboard = () => {
    const hashtagsText = uniqueHashtags.map((h) => h.hashtag).join(', ')
    navigator.clipboard.writeText(hashtagsText).then(() => addDialogue(t('hashtagsCopied'), Status.SUCCESS))
  }

  const uniqueHashtags = getUniqueSortedHashtags(hashtags)

  return (
    <>
      <div className="flex h-full w-full flex-col ">
        <div className="mt-4 flex flex-wrap gap-4">
          {uniqueHashtags.map((hashtag) => (
            <Badge variant="destructive" key={hashtag.hashtag}>
              {hashtag.hashtag}
            </Badge>
          ))}
        </div>
        <div className="mb-2 flex w-full flex-col items-center">
          <div className="my-2 border-t"></div>
          <SubtleButton sizes={['m', 'm', 'm']} onClick={copyToClipboard} disabled={false}>
            <CopyIcon width={24} height={24} />
            Copy All
          </SubtleButton>
        </div>
      </div>
    </>
  )
}

const Session = (props: IFeatureBulletPoint) => {
  const { heading, items, children, description } = props

  return (
    <div className="session py-6 md:py-16">
      <h2 className="text-heading text-neutral-800">{heading}</h2>
      <h3>{description}</h3>
      <ul className="pl-6 pt-6">
        {Array.isArray(items) &&
          items.length > 0 &&
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

const Guide = (props: IGuide) => {
  const { heading, subheading, items, button } = props

  const handleClick = () => {
    if (button?.onClick) {
      button.onClick()
    } else {
      router.push(button.url)
    }
  }

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
          <PrimaryButton sizes={['l', 'l', 'l']} onClick={handleClick}>
            {button.name}
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

const HashtagSection = ({
  title,
  label,
  recentHashtags,
  allTimeHashtags,
}: {
  title: string
  label: string
  recentHashtags: Hashtag[]
  allTimeHashtags: Hashtag[]
}) => (
  <div className="mt-4 flex w-full flex-col gap-4">
    <div className="flex flex-row items-center justify-between">
      <div className="text-lg font-semibold capitalize">
        {label} for {title}
      </div>
    </div>
    <div className="flex flex-col items-stretch gap-4 md:flex-row">
      {[
        { type: 'Most Recent', hashtags: recentHashtags },
        { type: 'All Time', hashtags: allTimeHashtags },
      ].map((item, index) => (
        <div key={index} className="flex flex-col justify-between rounded-lg border bg-white p-4 md:flex-1">
          <div className="flex flex-row items-center justify-between">
            <h4 className="text-lg font-bold capitalize text-primary-500">{title}</h4>
            <div className="text-end text-neutral-500">{item.type}</div>
          </div>
          <Hashtags hashtags={item.hashtags} />
        </div>
      ))}
    </div>
  </div>
)

const Tag = (props: { data: IHashtagResponse; title: string }) => {
  const { t } = useTranslation(['seo', 'common'])
  const { title, data } = props
  const { onLogin } = useAuth()

  return (
    <>
      <Head>
        <title>{`${t('bestHashtag', { tag: title })} | Instagram Hashtags`}</title>
        <meta name="description" content={t('description')} />
      </Head>
      <div className="mt-12 flex w-full flex-col items-center">
        <div className="hidden w-full max-w-screen-2xl md:flex">
          <Breadcrumb lastItemName={title} />
        </div>
        <div className="mt-12 flex w-full max-w-screen-2xl flex-col gap-12 md:px-12">
          <div className="">
            <div className="flex flex-col gap-4">
              <h1 className="text-heading font-semibold capitalize"> {t('bestHashtag', { tag: title })}</h1>
              <h3 className="text-subheading text-neutral-500">{t('description')}</h3>
            </div>
          </div>
          <div className="flex w-full flex-col gap-12">
            <HashtagSection
              title={title}
              label={t('mostRepeatedHashtags')}
              recentHashtags={data.most_repeated.recent}
              allTimeHashtags={data.most_repeated.older}
            />
            <HashtagSection
              title={title}
              label={t('mostRelatedHashtags')}
              recentHashtags={data.is_related.recent}
              allTimeHashtags={data.is_related.older}
            />
          </div>

          <div className="mx-auto mt-12 w-full bg-neutral-200 px-12">
            <Session
              heading={t('session.heading')}
              description={''}
              items={t('session.items', { returnObjects: true })} // Assuming items is an array in the JSON
            >
              <div className="mt-4 flex w-full justify-center md:w-80">
                <PrimaryButton onClick={onLogin} sizes={['l', 'l', 'l']}>
                  {t('session.button')}
                </PrimaryButton>
              </div>
            </Session>
          </div>
          <Guide
            heading={t('guide.heading')}
            subheading={t('guide.subheading')}
            items={[
              {
                heading: t('guide.items.createAccount.heading'),
                content: t('guide.items.createAccount.content'),
              },
              {
                heading: t('guide.items.followNiche.heading'),
                content: t('guide.items.followNiche.content'),
              },
              {
                heading: t('guide.items.connectInstabot.heading'),
                content: t('guide.items.connectInstabot.content'),
              },
            ]}
            button={{
              name: t('guide.button'),
              url: '',
              onClick: onLogin,
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Tag
