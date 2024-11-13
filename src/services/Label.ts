import { AxiosResponse } from 'axios'

import fetcher from '@helpers/fetcher'

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
      labels: string[]
    }>
  >('/api/image/labels', {
    existing_labels: existing_labels,
    number: number,
    image_url: image_url,
  })

  // const sortedLabels: string[] = Object.entries(response.data.confidence)
  //   .sort((a, b) => b[1] - a[1])
  //   .slice(0, number)
  //   .map((entry) => entry[0])

  const sortedLabels = response.data.labels

  return sortedLabels
}
