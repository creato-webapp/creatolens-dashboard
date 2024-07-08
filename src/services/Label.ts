import { AxiosResponse } from 'axios'

import { Fetcher } from './fetcher'

type ReAnnotateLabelType = {
  existing_labels: string[]
  image_url: string
  number: number
}
export async function reAnnotateLabel(data: ReAnnotateLabelType) {
  const { existing_labels, image_url, number } = data
  const response = await Fetcher.POST<AxiosResponse>('/api/image/labels', {
    existing_labels: existing_labels,
    image_url: image_url,
  })
  const sortedLabels: string[] = Object.entries(response.data.confidence)
    .sort((a, b) => b[1] - a[1]) // Sort by confidence value in descending order
    .slice(0, number) // Get top 4 entries
    .map((entry) => entry[0]) // Extract the labels

  return sortedLabels
}
