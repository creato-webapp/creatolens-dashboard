import { transformWixImageURL } from '@utils/index'
import Link from 'next/link'
import { BlogListProps } from 'pages/blog'
import Image from 'next/image'
import { useTranslation } from 'next-i18next'
import IMAGE from '@constants/image'

const HotTopics = ({ blogs }: { blogs: BlogListProps['data'] }) => {
  const { t } = useTranslation('blog')

  if (!blogs || blogs.length === 0) {
    return (
      <div className="rounded-lg bg-white shadow-sm md:p-4">
        <div className="mb-2 flex w-full items-center justify-between">
          <h2 className="text-xl font-bold md:text-2xl">{t('hot_topics')}</h2>
        </div>
        <div className="py-8 text-center ">{t('no_blog_posts')}</div>
      </div>
    )
  }

  return (
    <div className="rounded-lg  shadow-sm md:p-4">
      <div className="mb-2 flex w-full items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">{t('hot_topics')}</h2>
        <Link href="/blog">
          <div className="text-xs hover:text-primary-500 md:text-sm">{t('see_more')}</div>
        </Link>
      </div>
      <div className="space-y-4">
        <div>
          {blogs.map((topic, index) => (
            <div key={topic.slug} className="mb-4">
              <Link href={`/blog/${topic.slug}`} className="hover:text-neutral-600 hover:underline hover:underline-offset-4 dark:hover:text-white/90">
                {index === 0 ? (
                  <div className="flex flex-col">
                    <Image
                      src={transformWixImageURL(topic.featuredImage) || IMAGE.LOGO_2TAG}
                      alt={`Featured image for ${topic.title}`}
                      width={400}
                      height={400}
                      className="w-full rounded-lg"
                    />
                    <h3 className="mt-2 text-lg md:text-lg">{topic.title}</h3>
                  </div>
                ) : (
                  <div className="flex flex-row items-center gap-4">
                    <Image
                      src={transformWixImageURL(topic.featuredImage) || IMAGE.LOGO_2TAG}
                      alt={`Featured image for ${topic.title}`}
                      width={100}
                      height={100}
                      className="w-24 rounded-lg md:w-32"
                    />
                    <h3 className="text-lg md:text-lg">{topic.title}</h3>
                  </div>
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HotTopics
