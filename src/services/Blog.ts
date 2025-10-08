import { items } from '@wix/data'
import { OAuthStrategy } from '@wix/sdk'

import { createClient } from '@wix/sdk'
import type { items as itemsModule } from '@wix/data'
type WixWithItems = { items: typeof itemsModule }

type BlogPost = {
  title: string
  description: string
  slug: string
  published: boolean
  featuredImage: string
  _createdDate: string
  tags: string[]
}

const client: ReturnType<typeof createClient> & WixWithItems = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: process.env.WIX_CLIENT_ID || '',
  }),
})

export const getBlogPosts = async () => {
  try {
    const result = await client.items.query(process.env.WIX_CMS_ID || '').find()

    if (!result.items.length) {
      return null
    }

    return result.items
      .filter((data: BlogPost) => data.title !== undefined)
      .filter((data: BlogPost) => data.description !== undefined)
      .filter((data: BlogPost) => data.slug !== undefined)
      .filter((data: BlogPost) => data.published === true)
      .map((data: BlogPost) => ({
        title: data.title,
        description: data.description,
        slug: data.slug,
        featuredImage: data.featuredImage || null,
        _createdDate: data._createdDate ? data._createdDate.toString() : null,
        tags: data.tags || [],
      }))
  } catch (error) {
    console.error(error)
    return null
  }
}
