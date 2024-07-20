import { AxiosResponse } from 'axios'

import fetcher from '@helpers/fetcher'

import { Labels } from './Object/ImageBlob'

type ReAnnotateLabelType = {
  existing_labels: string[]
  image_url: string
  number: number
}
export async function reAnnotateLabel(data: ReAnnotateLabelType) {
  const { existing_labels, image_url, number } = data
  const response = await fetcher.POST<
    AxiosResponse<{
      categories: string
      confidence: {
        [key: string]: number
      }
      labels: Labels[]
    }>
  >('/api/image/labels', {
    existing_labels: existing_labels,
    image_url: image_url,
  })
  const sortedLabels: string[] = Object.entries(response.data.confidence)
    .sort((a, b) => b[1] - a[1])
    .slice(0, number)
    .map((entry) => entry[0])

  return sortedLabels
}
