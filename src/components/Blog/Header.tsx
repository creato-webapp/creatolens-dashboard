import { transformWixImageURL } from '@utils/index'
import Head from 'next/head'
import { BlogPost } from 'pages/blog/[slug]'

const Header = ({ data, dangerouslySetInnerHTML }: { data: BlogPost; dangerouslySetInnerHTML: { __html: string } }) => {
  return (
    <>
      <Head>
        <title>{data.title} | Your Site Name</title>
        <meta name="description" content={data.description?.slice(0, 160) || data.title} />
        <meta property="og:title" content={data.title} />
        <meta property="og:description" content={data.description?.slice(0, 160) || data.title} />
        {data.featuredImage && <meta property="og:image" content={transformWixImageURL(data.featuredImage)} />}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={data._createdDate || ''} />
        <meta property="article:modified_time" content={data._updatedDate || ''} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={data.title} />
        <meta name="twitter:description" content={data.description?.slice(0, 160) || data.title} />
        {data.featuredImage && <meta name="twitter:image" content={transformWixImageURL(data.featuredImage)} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script type="application/ld+json" dangerouslySetInnerHTML={dangerouslySetInnerHTML} key="blogpost-jsonld" />
      </Head>
    </>
  )
}

export default Header
