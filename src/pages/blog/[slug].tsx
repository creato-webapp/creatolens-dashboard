import { createClient, OAuthStrategy } from '@wix/sdk'
import { items } from '@wix/data'

import { RichContent } from '@components/Blog/RichContentViewer'
import Breadcrumb from '@components/Breadcrumb'
import Divider from '@components/Divider'
import { getBlogPosts } from '@services/Blog'
import { BlogListProps } from '.'
import HotTopics from '@components/Blog/HotTopics'
import Header from '@components/Blog/Header'
import { getLocaleProps } from '@services/locale'

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
    const result = await client.items
      .query(process.env.WIX_CMS_ID || '')
      .eq('slug', context.params.slug)
      .limit(1) // Add limit for optimization
      .find()

    if (!result.items.length) {
      return { notFound: true }
    }

    const data = result.items[0]
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

export default function BlogPost({ data, blogs }: { data: BlogPost; blogs: BlogListProps['data'] }) {
  function addBlogPostJsonLd() {
    return {
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
              <h1 className="my-12 text-2xl font-bold md:px-12">{data.title}</h1>
              {data._createdDate && (
                <p className="-mt-8 mb-8 text-sm text-gray-500 md:px-12">
                  {new Date(data._createdDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              )}
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
        </div>
      </div>
    </>
  )
}
