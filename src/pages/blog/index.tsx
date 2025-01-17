import Link from 'next/link'
import Image from 'next/image'
import { transformWixImageURL } from '@utils/index'
import Breadcrumb from '@components/Breadcrumb'
import { getBlogPosts } from '@services/Blog'

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
  }[]
}

const Divider = () => <hr className="my-2 border-t border-neutral-300" />

const BlogList = ({ data }: BlogListProps) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="flex w-full text-start">
          <Breadcrumb />
        </div>
        <div className="my-6 px-12">
          <h1 className="mb-8 text-3xl font-bold">Blog Posts</h1>
        </div>
        <div>
          <Divider />
        </div>
        <div className="my-16 space-y-8">
          {data.map((item) => (
            <article key={item.slug} className="border-b pb-8">
              <Link href={`/blog/${item.slug}`}>
                <div className="group flex cursor-pointer flex-row gap-12">
                  <div className="relative aspect-[4/3] w-full max-w-72 overflow-hidden rounded-lg">
                    {item.featuredImage && (
                      <>
                        <Image src={transformWixImageURL(item.featuredImage)} alt={item.title} fill className="z-10 rounded-lg object-contain" />
                        <Image
                          src={transformWixImageURL(item.featuredImage)}
                          alt=""
                          fill
                          className="scale-110 rounded-lg object-contain opacity-70 blur-md"
                        />
                      </>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold group-hover:text-blue-600">{item.title}</h2>
                    <p className="mt-2 text-neutral-800">{item.description}</p>
                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      {item._readingTime && <span>{item._readingTime} min read</span>}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

// Example of how to fetch blog posts

export async function getStaticProps() {
  const serializedData = await getBlogPosts()

  if (!serializedData) {
    return { notFound: true }
  }

  return {
    props: {
      data: serializedData,
    },
    revalidate: 3600,
  }
}

export default BlogList
