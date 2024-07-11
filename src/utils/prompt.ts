import { GeneralType } from 'src/constants/imageStyle'

interface Iprompt {
  aspectRatio: string
  imageStyle: string
  usage: {
    name: string
    platform: string
  }
  keywords: string
  selectedLabels: string[]
  selectedHashtags: string[]
  general: GeneralType
}

const promptGenerator = (props: Iprompt) => {
  console.log('props', props)
  return ''
}

export { promptGenerator }
