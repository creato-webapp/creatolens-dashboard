import Link from 'next/link'
import { slugify, transformWixImageURL } from '@utils/index'
import Breadcrumb from '@components/Breadcrumb'
import { getBlogPosts } from '@services/Blog'
import IMAGE from '@constants/image'
import { FolderIcon } from 'lucide-react'
import router from 'next/router'
import { getLocaleProps } from '@services/locale'
import { GetStaticPropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import BlurredImage from '@components/common/BlurredImage'

export interface BlogListProps {
  data: {
    title: string
    description: string
    slug: string
    featuredImage: string
    _createdDate: string
    _readingTime: string
    id: string
    excerpt: string
    tags: string[]
  }[]
}

const Divider = () => <hr className="my-2 border-t border-neutral-300" />

export const onClickCategory = (category: string) => {
  const categorySlug = slugify(category)
  router.push(`/blog/category/${categorySlug}`)
}

const FirstBlogPost = (props: BlogListProps['data'][0]) => {
  const { title, description, featuredImage, _createdDate, slug, tags } = props
  const { t } = useTranslation('blog')
  return (
    <div>
      <h2 className="text-2xl font-semibold">{t('latest_blog_title')}</h2>
      <div>
        <h3 className=" md:text-lg">&ldquo;{t('explore_blog_title')}</h3>
        <Link href={`/blog/${slug}`} className="mt-6 flex w-full flex-col gap-6 md:flex-row">
          <div className="relative aspect-[2/1] w-full flex-grow items-center justify-center overflow-hidden rounded-lg bg-red-50 md:h-[350px] md:w-2/3">
            <BlurredImage src={transformWixImageURL(featuredImage)} alt={title} fallbackSrc={IMAGE.LOGO_2TAG} />
          </div>
          <div className="flex w-full flex-col gap-2 md:w-1/3">
            <h2 className="text-2xl font-semibold hover:text-primary-500">{title}</h2>

            <p className="mt-2 line-clamp-3">{description}</p>
            <div className="mt-2 flex items-center gap-2 text-sm">
              <div>
                <FolderIcon className="h-4 w-4" />
              </div>
              {tags &&
                tags.map((tag, index) => (
                  <>
                    <div onClick={() => onClickCategory(tag)} key={tag} className="cursor-pointer text-sm">
                      {tag}
                    </div>
                    {index < tags.length - 1 && <span className="text-sm">/</span>}
                  </>
                ))}
            </div>
            <div className="text-sm">{new Date(_createdDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

const Blog = ({ data }: BlogListProps) => {
  const { t } = useTranslation('blog')
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="flex w-full text-start">
          <Breadcrumb />
        </div>
        <div className="my-6 w-full px-12">
          <h1 className="text-start text-3xl font-bold">{t('blog_title')}</h1>
        </div>
        <div className="w-full md:my-8">
          <Divider />
        </div>

        <div className="flex w-full flex-col space-y-8">
          {data.map((item, index) => {
            if (index === 0) {
              return <FirstBlogPost key={item.slug} {...item} />
            }
            return (
              <div key={item.slug} className="w-full pb-8 md:w-2/3">
                <article key={item.slug} className="pb-8">
                  <Link href={`/blog/${item.slug}`}>
                    <div className="group flex cursor-pointer flex-col-reverse gap-12 md:flex-row">
                      <div className="flex w-full flex-col gap-2 md:w-1/2">
                        <h2 className="text-2xl font-semibold group-hover:text-primary-500">{item.title}</h2>
                        <p className="mt-2 line-clamp-3 ">{item.description}</p>
                        <div className="text-sm">
                          {new Date(item._createdDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-sm">
                          <div>
                            <FolderIcon className="h-4 w-4" />
                          </div>
                          {item.tags &&
                            item.tags.map((tag, index) => (
                              <>
                                <div onClick={() => onClickCategory(tag)} key={tag} className="cursor-pointer text-sm">
                                  {tag}
                                </div>
                                {index < item.tags.length - 1 && <span className="text-sm">/</span>}
                              </>
                            ))}
                        </div>
                      </div>
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg md:w-1/2 md:max-w-72">
                        <BlurredImage src={transformWixImageURL(item.featuredImage)} alt={item.title} fallbackSrc={IMAGE.LOGO_2TAG} />
                      </div>
                    </div>
                  </Link>
                </article>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Example of how to fetch blog posts

export async function getStaticProps(context: GetStaticPropsContext) {
  const serializedData = await getBlogPosts()
  const lang = await getLocaleProps(context)

  if (!serializedData) {
    return { notFound: true }
  }

  return {
    props: {
      title: '2Tag | Blog',
      data: serializedData,
      ...lang,
    },
    revalidate: 3600,
  }
}

export default Blog
