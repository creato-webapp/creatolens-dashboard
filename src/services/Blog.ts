import { items } from '@wix/data'
import { OAuthStrategy } from '@wix/sdk'

import { createClient } from '@wix/sdk'

interface BlogPost {
  title: string
  description: string
  slug: string
  featuredImage: string
  _createdDate: string
}

const client = createClient({
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
      .map((data: BlogPost) => ({
        title: data.title,
        description: data.description,
        slug: data.slug,
        featuredImage: data.featuredImage || null,
        _createdDate: data._createdDate ? data._createdDate.toString() : null,
      }))
  } catch (error) {
    return null
  }
}
