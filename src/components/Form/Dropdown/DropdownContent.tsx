import { Checkbox } from '@components/ui/Checkbox'
import { DropdownOption } from './Dropdown'

const DropdownContent = ({
  isOpen,
  options,
  handleOptionSelect,
  isCheckbox,
  extraElement,
  isFloating,
}: {
  isOpen: boolean
  options: DropdownOption[]
  handleOptionSelect: (value: string | number) => () => void // Note the function signature
  isCheckbox?: boolean
  extraElement?: React.ReactNode
  isFloating?: boolean
}) => {
  if (isFloating) {
    if (!isOpen) return null
    return (
      <div className="absolute left-0 right-0 top-full z-10">
        <ul className="mt-2 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option, index) => (
            <li
              key={`${option.value}-${index}`}
              className="flex w-full cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100"
              onClick={handleOptionSelect(option.value as string)}
            >
              {isCheckbox && (
                <input
                  type="checkbox"
                  checked={option.checked || false}
                  className="mr-2 rounded border-stroke text-accent1-500 checked:bg-accent1-500 focus:bg-transparent focus:ring-0"
                  defaultChecked={option.checked || false}
                  onChange={handleOptionSelect(option.value as string)}
                  onClick={handleOptionSelect(option.value as string)}
                />
              )}
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <div className={`grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-300`}>
      <ul
        className={`${isOpen ? '' : 'hidden'} z-10 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg`}
        style={{ maxHeight: '250px', overflowY: 'auto' }} // Set max height and enable vertical scroll
      >
        {options.map((option) => (
          <li
            key={option.value}
            className="flex w-full cursor-pointer list-none flex-wrap items-center gap-2 px-4 py-2 hover:bg-gray-100"
            onClick={handleOptionSelect(option.value as string)}
          >
            {isCheckbox && (
              <Checkbox
                checked={option.checked || false}
                className="mr-2 rounded border-stroke text-primary-500 checked:bg-primary-500 focus:bg-transparent focus:ring-0"
                defaultChecked={option.checked || false}
                onChange={handleOptionSelect(option.value as string)}
                onClick={handleOptionSelect(option.value as string)}
              />
            )}
            {option.label}
          </li>
        ))}
        {extraElement}
      </ul>
    </div>
  )
}

export default DropdownContent
