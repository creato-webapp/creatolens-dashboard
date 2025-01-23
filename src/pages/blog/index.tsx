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
    tags: string[]
  }[]
}

const Divider = () => <hr className="my-2 border-t border-neutral-300" />

const FirstBlogPost = (props: BlogListProps['data'][0]) => {
  const { title, description, featuredImage, _createdDate, slug, tags } = props
  return (
    <div>
      <h2 className="text-2xl font-semibold">Latest</h2>
      <div>
        <h3 className="text-lg text-neutral-500">&ldquo;Explore AI and digital marketing trends on 2Tag&apos;s blog</h3>
        <div className="flex w-full flex-row gap-12">
          <div className="relative aspect-[2/1] h-[350px] w-2/3 flex-grow items-center justify-center overflow-hidden rounded-lg bg-red-50">
            <Image src={transformWixImageURL(featuredImage)} alt={title} fill className="z-10 rounded-lg object-contain py-2" />
          </div>
          <div className="flex w-1/3 flex-col gap-2">
            <Link href={`/blog/${slug}`}>
              <h2 className="text-2xl font-semibold text-neutral-800">{title}</h2>
            </Link>
            <p className="mt-2 line-clamp-3 text-neutral-800">{description}</p>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              {tags &&
                tags.map((tag) => (
                  <div key={tag} className="text-sm text-gray-500">
                    {tag}
                  </div>
                ))}
            </div>
            <div className="text-sm text-gray-500">
              {new Date(_createdDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlogList = ({ data }: BlogListProps) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="flex w-full text-start">
          <Breadcrumb />
        </div>
        <div className="my-6 w-full px-12">
          <h1 className="mb-8 text-start text-3xl font-bold">Blog Posts</h1>
        </div>
        <div className="w-full">
          <Divider />
        </div>

        <div className="space-y-8">
          {data.map((item, index) => {
            if (index === 0) {
              return <FirstBlogPost key={item.slug} {...item} />
            }
            return (
              <div key={item.slug} className="w-2/3 border-b pb-8">
                <article key={item.slug} className="border-b pb-8">
                  <Link href={`/blog/${item.slug}`}>
                    <div className="group flex cursor-pointer flex-row gap-12">
                      <div className="flex w-1/2 flex-col gap-2">
                        <h2 className="text-2xl font-semibold group-hover:text-primary-500">{item.title}</h2>
                        <p className="mt-2 line-clamp-3 text-neutral-800">{item.description}</p>
                        <div className="text-sm text-gray-500">
                          {new Date(item._createdDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                          {item.tags &&
                            item.tags.map((tag) => (
                              <div key={tag} className="text-sm text-gray-500">
                                {tag}
                              </div>
                            ))}
                        </div>
                      </div>
                      <div className="relative aspect-[4/3] w-1/2 max-w-72 overflow-hidden rounded-lg">
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
