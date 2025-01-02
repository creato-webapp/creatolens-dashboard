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
  return array.join(', ')
}
