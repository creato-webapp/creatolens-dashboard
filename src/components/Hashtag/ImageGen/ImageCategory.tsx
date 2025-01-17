import Dropdown from '@components/Form/Dropdown/Dropdown'
import { usePromptTemplate } from '@hooks/usePromptTemplate'
import { getModifiersImage } from '@services/HashtagHelper'
import { useCallback, useMemo } from 'react'

export interface ImageCategoryListType {
  [key: string]: {
    label: string
    key: string
    options: ImageOptionType[]
    templateType: string[]
  }
}

interface ImageOptionType {
  label: string
  value: string
  image: string
}

interface ImageCategorySelectorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  imageConfigStyles: string
  setCategories: (category: string, option: string) => void
  imageCategory: Record<string, string>
}

const ImageCategory = ({ imageConfigStyles, setCategories, imageCategory }: ImageCategorySelectorProps) => {
  const { imageCategories } = usePromptTemplate() // remote config
  const data = useMemo(() => getModifiersImage(imageCategories), [imageCategories])

  const onGeneralSelected = useCallback(
    (option: keyof ImageCategoryListType, value: string) => {
      setCategories(option as string, value)
    },
    [setCategories]
  )

  if (!imageConfigStyles) {
    return null
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {Object.entries(data).map(
          ([, value]) =>
            value.templateType.includes(imageConfigStyles) &&
            value.options && (
              <Dropdown
                dropDownSizes={['m', 'm', 'm']}
                name={value.label}
                key={value.key}
                options={value.options.map((option: ImageOptionType) => ({ label: option.label, value: option.value, image: option.image }))}
                onValueChange={(selectedValue) => onGeneralSelected(value.key, selectedValue as string)}
                buttonClassName={imageCategory[value.key] ? 'bg-white' : 'bg-neutral-200'} // Set to bg-white when selected
              />
            )
        )}
      </div>
    </div>
  )
}

export default ImageCategory
