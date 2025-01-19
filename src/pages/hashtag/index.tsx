import Link from 'next/link'
import { Badge } from '@components/ui/Badge'
import { GetStaticProps } from 'next'
import { fetchSeoPagePath } from '@services/Seo/Keywords'
import Head from 'next/head'

interface HashtagPage {
  tag: string
  url: string
}

interface HomeProps {
  pages: HashtagPage[]
}

export const getStaticProps: GetStaticProps = async () => {
  const paths = await fetchSeoPagePath()
  const pages = paths.map((path) => ({
    url: `/hashtag/${path.params.tag}`,
    tag: path.params.tag,
  }))

  return {
    props: {
      pages,
    },
  }
}

const Home = ({ pages }: HomeProps) => {
  return (
    <>
      <Head>
        <title>Keywords and Hashtags</title>
        <meta
          name="description"
          content="Ready-To-Go Hashtag Set from  2Tag. Can be used for free for both commercial and personal uses. Boost your SEO or organic reach by applying these keywords or understand the latest trend of niche topic."
        />
      </Head>
      <div className="container mx-auto mt-12 px-6 md:px-12">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">Keywords and Hashtags</h1>
        <p className="mb-12 text-center text-base text-neutral-500">
          Ready-To-Go Hashtag Set from 2Tag. Can be used for free for both commercial and personal uses. Boost your SEO or organic reach by applying
          these keywords or understand the latest trend of niche topic..
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {pages.map((page) => (
            <Link
              href={page.url}
              key={page.tag}
              className="group relative block overflow-hidden rounded-xl border border-gray-200 p-6 shadow-sm transition-all duration-200 hover:translate-y-[-2px] hover:border-primary-200 hover:shadow-md"
            >
              <div className="flex flex-col items-center text-center">
                <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-medium">
                  #{page.tag}
                </Badge>
                <h2 className="text-lg font-semibold text-gray-800 transition group-hover:text-primary-600">{page.tag}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Home
