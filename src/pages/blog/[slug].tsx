import { createClient, OAuthStrategy } from '@wix/sdk'
import { items } from '@wix/data'

import { RichContent } from '@components/Blog/RichContentViewer'
import Breadcrumb from '@components/Breadcrumb'
import Divider from '@components/Divider'
import { getBlogPosts } from '@services/Blog'
import { BlogListProps, onClickCategory } from '.'
import HotTopics from '@components/Blog/HotTopics'
import Header from '@components/Blog/Header'
import { getLocaleProps } from '@services/locale'
import { ArrowLeft, ArrowRight, FolderIcon } from 'lucide-react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

const createWixClient = () => {
  return createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID || '',
    }),
  })
}

export interface BlogPost {
  _id: string
  slug: string
  description: string
  title: string
  richcontent: RichContent
  tags: string[]
  _createdDate?: string
  _updatedDate?: string
  featuredImage: string
}

export async function getStaticPaths() {
  const client = createWixClient()

  try {
    const result = await client.items
      .query(process.env.WIX_CMS_ID || '')
      .limit(100) // Add limit for better performance
      .find()

    const paths = result.items.map((item) => ({
      params: { slug: item.slug || item._id }, // Use slug if available, fallback to ID
    }))

    return {
      paths,
      fallback: false, // Return 404 for non-existing paths
    }
  } catch (error) {
    console.error('Error in getStaticPaths:', error)
    return { paths: [], fallback: false }
  }
}

// Add getStaticProps to fetch data at build time
export async function getStaticProps(context: { params: { slug: string }; locale: string }) {
  const client = createWixClient()

  try {
    const [currentPost, otherPosts] = await Promise.all([
      client.items
        .query(process.env.WIX_CMS_ID || '')
        .eq('slug', context.params.slug)
        .eq('published', true)
        .limit(1)
        .find(),
      client.items
        .query(process.env.WIX_CMS_ID || '')
        .ne('slug', context.params.slug)
        .eq('published', true)
        .limit(2)
        .find(),
    ])

    const result = {
      items: [...currentPost.items, ...otherPosts.items],
    }

    if (!result.items.length) {
      return { notFound: true }
    }

    const data = result.items[0]

    // if there is no previous or next post, set it to null
    const previousPost = result.items[1] ? { title: result.items[1].title, slug: result.items[1].slug } : null
    const nextPost = result.items[2] ? { title: result.items[2].title, slug: result.items[2].slug } : null

    const serializedData = {
      ...data,
      _createdDate: data._createdDate ? data._createdDate.toISOString() : null, // Convert to ISO string
      _updatedDate: data._updatedDate ? data._updatedDate.toISOString() : null, // Convert if exists
    }

    const otherTopicsData = await getBlogPosts()
    // remove the current blog post from the list
    const filteredOtherTopicsData = otherTopicsData?.filter((topic) => topic.slug !== context.params.slug)
    const lang = await getLocaleProps(context)
    return {
      props: {
        data: serializedData,
        blogs: filteredOtherTopicsData,
        previousPost: previousPost ? { title: previousPost.title, slug: previousPost.slug } : null,
        nextPost: nextPost ? { title: nextPost.title, slug: nextPost.slug } : null,
        ...lang,
      },
      revalidate: 3600, // Optional: Revalidate every hour
    }
  } catch (error) {
    console.error('Error in getStaticProps:', error)
    return { notFound: true }
  }
}

const BlogContent = ({ content }: { content: RichContent }) => (
  <div className="w-full">
    {content ? (
      <div>
        <RichContent content={content} />
      </div>
    ) : (
      'No content available'
    )}
  </div>
)

export default function BlogPost({
  data,
  blogs,
  previousPost,
  nextPost,
}: {
  data: BlogPost
  blogs: BlogListProps['data']
  previousPost: { title: string; slug: string } | null
  nextPost: { title: string; slug: string } | null
}) {
  const { t } = useTranslation('blog')
  function addBlogPostJsonLd() {
    const jsonLd = {
      __html: `{
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": "${data.title}",
        "description": "${data.description}",
        "image": "${data.featuredImage}",
        "author": {
          "@type": "Person",
          "name": "2Tag.ai"
        },
        "publisher": {
          "@type": "Organization",
          "name": "2Tag.ai",
          "logo": {
            "@type": "ImageObject",
            "url": "${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/logo/2tag-logo.png"
          }
        },
        "datePublished": "${data._createdDate}",
        "dateModified": "${data._updatedDate}",
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "${process.env.NEXT_PUBLIC_LOCAL_SERVER_URL}/blog/${data.slug}"
        }
      }`,
    }
    const safeJsonLd = JSON.stringify(jsonLd)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026')
      .replace(/'/g, '\\u0027')
      .replace(/"/g, '\\u0022')

    return {
      __html: `{
      "@context": "https://schema.org",
      "@type": "script",
      "type": "application/ld+json",
      "text": ${safeJsonLd}
    }`,
    }
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Header data={data} dangerouslySetInnerHTML={addBlogPostJsonLd()} />
      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-7xl flex-col items-center justify-center">
          <div className="hidden w-full items-start justify-start md:flex">
            <Breadcrumb lastItemName={data.title} />
          </div>
          <div className="relative flex w-full flex-col md:flex-row">
            <div className="">
              <div className="flex flex-col gap-2 md:px-12">
                <h1 className="mt-6 text-2xl font-bold">{data.title}</h1>
                <div className="flex flex-col gap-2 md:flex-row md:items-center">
                  <div className="my-4 flex flex-wrap items-center gap-2">
                    <FolderIcon className="h-4 w-4 text-neutral-500" />
                    {data.tags?.map((tag, index) => (
                      <div key={`${tag}-${index}`} className="flex flex-row items-center gap-2">
                        <div onClick={() => onClickCategory(tag)} className="cursor-pointer text-sm text-gray-500">
                          {tag}
                        </div>
                        {index < data.tags.length - 1 && <span className="text-sm text-gray-500">/</span>}
                      </div>
                    ))}
                  </div>
                  {data._createdDate && (
                    <p className="text-sm text-gray-500 md:px-12">
                      {new Date(data._createdDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
              </div>
              <Divider />
              <div className="flex w-full flex-col md:flex-row">
                <div className="md:w-2/3 ">
                  <BlogContent content={data.richcontent} />
                </div>
                <div className="mt-12 w-full md:mt-0 md:block md:w-1/3">
                  <HotTopics blogs={blogs} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div>
              <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex flex-col justify-between gap-4 md:w-1/2 md:flex-row">
                  {previousPost && (
                    <Link href={`/blog/${previousPost.slug}`} className="group flex flex-1 flex-col gap-2 rounded-lg p-4 hover:border-primary-500">
                      <span className="flex flex-row items-center gap-2 text-sm text-gray-500 group-hover:text-primary-500">
                        <ArrowLeft className="h-4 w-4" /> {t('previous_post')}
                      </span>
                      <h3 className="font-medium group-hover:text-primary-500">{previousPost.title}</h3>
                    </Link>
                  )}
                  {nextPost && (
                    <Link href={`/blog/${nextPost.slug}`} className="group flex flex-1 flex-col gap-2 rounded-lg p-4 hover:border-primary-500">
                      <span className="flex flex-row items-center justify-end gap-2 text-sm text-gray-500 group-hover:text-primary-500">
                        <ArrowRight className="h-4 w-4" /> {t('next_post')}
                      </span>
                      <h3 className="font-medium group-hover:text-primary-500">{nextPost.title}</h3>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
