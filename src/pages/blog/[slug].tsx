import { createClient, OAuthStrategy } from '@wix/sdk'
import { items } from '@wix/data'

import { RichContent } from '@components/Blog/RichContentViewer'
import Breadcrumb from '@components/Breadcrumb'
import Divider from '@components/Divider'
import { getBlogPosts } from '@services/Blog'
import { BlogListProps } from '.'
import Image from 'next/image'
import { transformWixImageURL } from '@utils/index'
const createWixClient = () => {
  return createClient({
    modules: { items },
    auth: OAuthStrategy({
      clientId: process.env.WIX_CLIENT_ID || '',
    }),
  })
}

interface BlogPost {
  _id: string
  slug: string
  title: string
  richcontent: RichContent
  _createdDate?: Date
  _updatedDate?: Date
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
export async function getStaticProps({ params }: { params: { slug: string } }) {
  const client = createWixClient()

  try {
    const result = await client.items
      .query(process.env.WIX_CMS_ID || '')
      .eq('slug', params.slug)
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
    const filteredOtherTopicsData = otherTopicsData?.filter((topic) => topic.slug !== params.slug)

    return {
      props: {
        data: serializedData,
        blogs: filteredOtherTopicsData,
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
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="hidden w-full items-start justify-start md:flex">
          <Breadcrumb lastItemName={data.title} />
        </div>
        <div className="relative flex w-full flex-col md:flex-row">
          <div>
            <h1 className="my-12 px-12 text-2xl font-bold">{data.title}</h1>
            <Divider />
            <div className="flex w-full flex-col md:flex-row">
              <div className="w-2/3 ">
                <BlogContent content={data.richcontent} />
              </div>
              <aside className="sticky top-0 w-1/3 p-4">
                <div className="rounded-lg bg-white p-6 shadow-sm">
                  <div className="mb-2 flex w-full items-center justify-between">
                    <h2 className="text-2xl font-bold">Hot Topics</h2>
                    <div className="text-sm text-gray-500">See More</div>
                  </div>
                  <div className="space-y-4">
                    <article>
                      {blogs.map((topic, index) => (
                        <div key={topic.slug}>
                          <Image
                            src={transformWixImageURL(topic.featuredImage)}
                            alt={topic.title}
                            width={index === 0 ? 400 : 100}
                            height={index === 0 ? 400 : 100}
                            className={index === 0 ? 'w-full' : ''}
                          />
                          <h3 className="text-neutral-800">{topic.title}</h3>
                        </div>
                      ))}
                    </article>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
