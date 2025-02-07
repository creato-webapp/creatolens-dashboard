import Link from 'next/link'
import { slugify, transformWixImageURL } from '@utils/index'
import Breadcrumb from '@components/Breadcrumb'
import { getBlogPosts } from '@services/Blog'
import IMAGE from '@constants/image'
import { FolderIcon } from 'lucide-react'
import { onClickCategory } from '..'
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
  category: string
}

const BlogList = ({ data, category }: BlogListProps) => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-7xl flex-col items-center justify-center">
        <div className="flex w-full text-start">
          <Breadcrumb />
        </div>
        <div className="my-6 w-full px-12">
          <h1 className="mb-8 text-start text-3xl font-bold capitalize">{category}</h1>
        </div>

        <div className="space-y-8">
          {data.map((item) => (
            <div key={item.slug} className="pb-8">
              <article className="border-b pb-8">
                <Link href={`/blog/${item.slug}`} className="flex flex-col gap-12 md:flex-row ">
                  <div className="relative aspect-[4/3] min-w-full overflow-hidden rounded-lg md:min-w-[350px]">
                    <BlurredImage src={transformWixImageURL(item.featuredImage)} alt={item.title} fallbackSrc={IMAGE.LOGO_2TAG} />
                  </div>
                  <div className="group flex cursor-pointer flex-row gap-12">
                    <div className="flex flex-col gap-2">
                      <h2 className="text-2xl font-semibold group-hover:text-primary-500">{item.title}</h2>
                      <p className="mt-2 line-clamp-3 text-neutral-800">{item.description}</p>
                      <div className="text-sm text-gray-500">
                        {new Date(item._createdDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <FolderIcon className="h-4 w-4" />
                        {item.tags &&
                          item.tags.map((tag, index) => (
                            <div key={item.slug + tag} className="flex items-center gap-2">
                              <div
                                onClick={(e) => {
                                  e.preventDefault()
                                  onClickCategory(tag)
                                }}
                                key={tag}
                                className="cursor-pointer text-sm text-gray-500"
                              >
                                {tag}
                              </div>
                              {index < item.tags.length - 1 && <span className="text-sm text-gray-500">/</span>}
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const posts = await getBlogPosts()
  if (!posts) return { paths: [], fallback: false }

  // Get unique categories from all posts
  const categories = [...new Set(posts.flatMap((post) => post.tags))]

  const paths = categories.map((category) => ({
    params: { category: slugify(category) },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { category: string } }) {
  const allPosts = await getBlogPosts()

  if (!allPosts) {
    return { notFound: true }
  }

  // Filter posts by category
  const filteredPosts = allPosts.filter((post) => {
    return post.tags?.map((tag: string) => slugify(tag)).includes(params.category)
  })

  return {
    props: {
      data: filteredPosts,
      category: params.category,
    },
    revalidate: 3600,
  }
}

export default BlogList
