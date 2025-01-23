import { clsx, type ClassValue } from 'clsx'
import { Hashtag } from 'pages/hashtag/[tag]'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(item: string): string {
  return item
    .toLowerCase() // Convert to lowercase
    .replace(/&/g, 'and') // Replace "&" with "and"
    .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special characters with "-"
    .replace(/^-+|-+$/g, '') // Remove leading or trailing "-"
}

export const getUniqueSortedHashtags = (hashtags: Hashtag[]): Hashtag[] => {
  return Array.from(new Map(hashtags.map((hashtag) => [hashtag.hashtag, hashtag])).values()).sort((a, b) => b.count - a.count)
}

export const transformWixImageURL = (wixUrl: string) => {
  const replaced = wixUrl.replace('wix:image://v1/', 'https://static.wixstatic.com/media/')
  return replaced.substring(0, replaced.lastIndexOf('/'))
}

export const arrayOfStringsToSentence = (array: string[]): string => {
  if (!array) return ''
  return array.join(', ')
}

export function convertGcsUriToHttp(gsUri: string): string {
  if (!gsUri.startsWith('gs://')) {
    // throw new Error("Invalid GCS URI. It must start with 'gs://'")
    return ''
  }

  // Remove the "gs://" prefix
  const path = gsUri.replace('gs://', '')

  // Split into bucket name and object path
  const [bucketName, ...objectPathParts] = path.split('/')
  const objectPath = objectPathParts.join('/')

  // Encode object path to handle special characters
  const encodedObjectPath = encodeURIComponent(objectPath).replace(/%2F/g, '/') // Keep "/" unencoded

  // Construct the public URL
  return `https://storage.googleapis.com/${bucketName}/${encodedObjectPath}`
}

const getFileExtension = (url: string): string => {
  const match = url.match(/\.([^./?#]+)(?:[?#]|$)/)
  return match ? `.${match[1].toLowerCase()}` : '.jpg'
}

export const downloadMultipleImages = async (imageUrls: string[]) => {
  try {
    // Dynamically import JSZip only on client side
    const JSZip = (await import('jszip')).default
    const zip = new JSZip()

    // Download each image and add to zip
    const imagePromises = imageUrls.map(async (url, index) => {
      const response = await fetch(url)
      const blob = await response.blob()
      zip.file(`image_${index + 1}${getFileExtension(url)}`, blob)
    })

    await Promise.all(imagePromises)

    // Generate and download zip file
    const zipContent = await zip.generateAsync({ type: 'blob' })
    const zipUrl = URL.createObjectURL(zipContent)

    const link = document.createElement('a')
    link.href = zipUrl
    link.download = '2tag-generated-images.zip'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(zipUrl)
  } catch (error) {
    console.error('Error downloading images:', error)
    // Handle error appropriately (e.g., show error message to user)
  }
}
