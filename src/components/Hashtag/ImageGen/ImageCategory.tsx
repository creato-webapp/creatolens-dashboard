import Dropdown from '@components/Form/Dropdown/Dropdown'
import { ImageCategoryType, ImageStyleKeys } from '@constants/imageStyle'
import { usePromptTemplate } from '@hooks/usePromptTemplate'
import { useCallback, useState } from 'react'

interface ImageCategorySelectorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  imageConfigStyles: ImageStyleKeys
  setCategories: (category: string, option: string) => void
}

const ImageCategory = ({ imageConfigStyles, setCategories }: ImageCategorySelectorProps) => {
  const { imageCategories } = usePromptTemplate() // remote config

  const [selectedValues, setSelectedValues] = useState<{ [key: string]: string | null }>({})

  const onGeneralSelected = useCallback(
    (option: keyof ImageCategoryType, value: string) => {
      setCategories(option.toString(), value)
      setSelectedValues((prevState) => ({ ...prevState, [option]: value })) // Track selected value
    },
    [setCategories]
  )

  if (!imageConfigStyles) {
    return <div></div>
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="capitalize">{imageConfigStyles.toLocaleLowerCase()}</div>
        {Object.entries(imageCategories).map(
          ([key, value]) =>
            value.templateType.includes(imageConfigStyles) && (
              <Dropdown
                name={value.label}
                dropDownSizes={['m', 'm', 'm']}
                key={key}
                options={value.options.map((option) => ({ label: option.label, value: option.value }))}
                onValueChange={(selectedValue) => onGeneralSelected(value.key, selectedValue as string)}
                buttonClassName={selectedValues[value.key] ? 'bg-white' : 'bg-neutral-200'} // Set to bg-white when selected
              />
            )
        )}
      </div>
    </div>
  )
}

export default ImageCategory
