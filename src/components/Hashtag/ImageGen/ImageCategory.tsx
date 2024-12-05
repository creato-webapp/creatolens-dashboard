import Dropdown from '@components/Form/Dropdown/Dropdown'
import { ImageCategoryType, ImageStyleKeys } from '@constants/imageStyle'
import { usePromptTemplate } from '@hooks/usePromptTemplate'
import { useCallback } from 'react'

interface ImageCategorySelectorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  imageConfigStyles: ImageStyleKeys
  setCategories: (category: string, option: string) => void
}

const ImageCategory = ({ imageConfigStyles, setCategories }: ImageCategorySelectorProps) => {
  const { imageCategories } = usePromptTemplate() // remote config

  const onGeneralSelected = useCallback(
    (option: keyof ImageCategoryType, value: string) => {
      setCategories(option.toString(), value)
    },
    [setCategories]
  )

  if (!imageConfigStyles) {
    return <div>No</div>
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        {Object.entries(imageCategories).map(
          ([key, value]) =>
            value.templateType.includes(imageConfigStyles) && (
              <Dropdown
                name={value.label}
                dropDownSizes={['m', 'm', 'm']}
                key={key}
                options={value.options.map((option) => ({ label: option.label, value: option.value }))}
                onValueChange={(selectedValue) => onGeneralSelected(value.key, selectedValue as string)}
              />
            )
        )}
      </div>
    </div>
  )
}

export default ImageCategory
