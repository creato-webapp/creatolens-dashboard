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
