import { Button } from '@components/Button'
import Divider from '@components/Divider'
import Image from 'next/image'
import React from 'react'

interface ContainerData {
  alignment?: string
  width?: {
    size?: string
    custom?: number
  }
  height?: {
    size?: string
    custom?: number
  }
  textWrap?: boolean
  backgroundColor?: string
  backgroundImage?: {
    src: {
      id: string
    }
  }
  custom?: {
    [key: string]: number
  }
}
interface RichContentNode {
  type: string
  id: string
  nodes: RichContentNode[]
  textData?: {
    text: string
    decorations?: Array<{
      type: string
      linkData?: {
        link: {
          url: string
          target?: string
        }
      }
      colorData?: {
        foreground?: string
        background?: string
      }
      italicData?: boolean
      fontWeightValue?: number
    }>
  }
  imageData?: {
    caption: string
    image: {
      src: {
        id: string
      }
      width: number
      height: number
      caption?: string
    }
    containerData?: ContainerData
  }
  gifData?: {
    height: number
    width: number
    downsized: {
      gif: string
      mp4: string
      still: string
    }
    original: {
      gif: string
      mp4: string
      still: string
    }
    containerData?: ContainerData
  }
  videoData?: {
    video: {
      src: {
        id: string
      }
    }
    thumbnail: {
      src: {
        id: string
      }
      width: number
      height: number
    }
    containerData?: ContainerData
  }
  galleryData?: {
    containerData?: ContainerData
    items: Array<{
      image: {
        media: {
          src: {
            url: string
          }
          width: number
          height: number
        }
      }
    }>
    options: {
      layout: {
        type: string
        horizontalScroll: boolean
        orientation: string
        numberOfColumns: number
      }
      item: {
        ratio: number
        crop: string
      }
      thumbnails: {
        placement: string
      }
    }
  }
  headingData?: {
    level: number
  }
  embedData?: {
    oembed: {
      html: string
    }
    containerData?: ContainerData
  }
  buttonData?: {
    text: string
    link: {
      url: string
    }
    containerData?: ContainerData
  }
}

export interface RichContent {
  nodes: RichContentNode[]
}

const applyDecorations = (text: string, decorations: NonNullable<RichContentNode['textData']>['decorations'] = []) => {
  let element: React.ReactNode = text

  decorations?.forEach((decoration, index) => {
    const uniqueKey = `${decoration.type.toLowerCase()}-${text}-${index}`

    switch (decoration.type) {
      case 'LINK':
        element = (
          <a
            key={uniqueKey}
            href={decoration.linkData?.link.url}
            target={decoration.linkData?.link.target === 'BLANK' ? '_blank' : undefined}
            rel="noopener noreferrer"
            className="text-link"
          >
            {element}
          </a>
        )
        break
      case 'BOLD':
        element = <strong key={uniqueKey}>{element}</strong>
        break
      case 'ITALIC':
        element = <em key={uniqueKey}>{element}</em>
        break
      case 'UNDERLINE':
        element = <u key={uniqueKey}>{element}</u>
        break
      case 'COLOR':
        element = (
          <span
            key={uniqueKey}
            style={{
              color: decoration.colorData?.foreground,
              backgroundColor: decoration.colorData?.background,
            }}
          >
            {element}
          </span>
        )
        break
    }
  })

  return element
}

const parseNode = (node: RichContentNode): React.ReactNode => {
  switch (node.type) {
    case 'PARAGRAPH':
      return (
        <p key={node.id} className="text-paragraph font-normal">
          {node.nodes.map((childNode) => parseNode(childNode))}
        </p>
      )
    case 'HEADING': {
      const HeadingTag = `h${node.headingData?.level || 2}` as keyof JSX.IntrinsicElements
      return (
        <HeadingTag className={'text-subheading font-semibold'} key={node.id}>
          {node.nodes.map((childNode) => parseNode(childNode))}
        </HeadingTag>
      )
    }

    case 'TEXT':
      return node.textData ? applyDecorations(node.textData.text, node.textData.decorations) : null

    case 'IMAGE':
      if (!node.imageData?.image.src.id) return null
      return (
        <div
          key={node.id}
          style={{
            textAlign: node.imageData.containerData?.alignment?.toLowerCase() as React.CSSProperties['textAlign'],
            width: node.imageData.containerData?.width?.size === 'CONTENT' ? 'fit-content' : '100%',
          }}
        >
          <Image
            src={'https://static.wixstatic.com/media/' + node.imageData.image.src.id}
            alt=""
            style={{
              maxWidth: '100%',
              height: 'auto',
              width: '100%',
            }}
            className="object-cover"
            width={node.imageData.image.width}
            height={node.imageData.image.height}
          />
          {node.imageData.caption && <p className="text-caption font-normal">{node.imageData.caption}</p>}
        </div>
      )
    case 'GIF':
      if (!node.gifData) return null
      return (
        <div
          key={node.id}
          style={{
            display: 'flex',
            alignItems: node.gifData.containerData?.alignment?.toLowerCase() as React.CSSProperties['alignItems'],
            width: node.gifData.containerData?.width?.size === 'CONTENT' ? 'fit-content' : '100%',
          }}
        >
          <img
            src={node.gifData.downsized.gif}
            alt=""
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
      )
    case 'VIDEO':
      if (!node.videoData?.video.src.id) return null
      return (
        <div
          key={node.id}
          style={{
            textAlign: node.videoData.containerData?.alignment?.toLowerCase() as React.CSSProperties['textAlign'],
            width: node.videoData.containerData?.width?.size === 'CONTENT' ? 'fit-content' : '100%',
          }}
        >
          <video
            controls
            poster={`https://static.wixstatic.com/${node.videoData.thumbnail.src.id}`}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          >
            <source src={`https://video.wixstatic.com/${node.videoData.video.src.id}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )
    case 'GALLERY':
      if (!node.galleryData?.items.length) return null
      return (
        <div
          key={node.id}
          style={{
            textAlign: node.galleryData.containerData?.alignment?.toLowerCase() as React.CSSProperties['textAlign'],
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${node.galleryData.options.layout.numberOfColumns}, 1fr)`,
              gap: '8px',
              width: '100%',
            }}
          >
            {node.galleryData.items.map((item, index) => (
              <div
                key={index}
                style={{
                  position: 'relative',
                  paddingBottom: `${(item.image.media.height / item.image.media.width) * 100}%`,
                  overflow: 'hidden',
                }}
                className="w-full"
              >
                <Image
                  src={`https://static.wixstatic.com/media/${item.image.media.src.url}`}
                  alt=""
                  style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover', // FILL crop mode
                  }}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )

    case 'BLOCKQUOTE':
      return (
        <blockquote key={node.id} className="text-paragraph ml-4 border-l-2 border-blue-600 pl-4 font-normal">
          {node.nodes.map((childNode) => parseNode(childNode))}
        </blockquote>
      )

    case 'BULLETED_LIST':
      return (
        <ul key={node.id} className="text-paragraph font-normal">
          {node.nodes.map((childNode) => parseNode(childNode))}
        </ul>
      )

    case 'LIST_ITEM':
      return (
        <li key={node.id} className="ml-2 list-outside list-disc">
          {node.nodes.map((childNode) => parseNode(childNode))}
        </li>
      )

    case 'DIVIDER':
      return <Divider key={node.id} />

    case 'EMBED':
      if (!node.embedData) return null
      return (
        <div
          key={node.id}
          style={{
            width: node.embedData.containerData?.width?.custom ? `${node.embedData.containerData.width.custom}px` : '100%',
            height: node.embedData.containerData?.height?.custom ? `${node.embedData.containerData.height.custom}px` : 'auto',
            margin: node.embedData.containerData?.alignment === 'CENTER' ? '0 auto' : undefined,
          }}
          className="embed-container h-fit overflow-hidden"
        >
          <div dangerouslySetInnerHTML={{ __html: node.embedData.oembed.html }} />
        </div>
      )

    case 'BUTTON':
      return (
        <Button.Outline
          onClick={() => {
            window.open(node.buttonData?.link.url, '_blank')
          }}
          key={node.id}
          className="w-fit"
          style={{
            alignItems: node.buttonData?.containerData?.alignment?.toLowerCase() as React.CSSProperties['alignItems'],
          }}
        >
          {node.buttonData?.text}
        </Button.Outline>
      )

    default:
      return null
  }
}

export const parseRichContent = (content: RichContent): React.ReactNode[] => {
  try {
    return content.nodes.map((node) => parseNode(node))
  } catch (error) {
    console.error('Error parsing rich content:', error)
    return []
  }
}

interface RichContentProps {
  content: RichContent
}

export const RichContent: React.FC<RichContentProps> = ({ content }) => {
  return <div className="rich-content flex flex-col gap-4">{parseRichContent(content)}</div>
}
