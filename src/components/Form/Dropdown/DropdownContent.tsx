import { DropdownOption } from './Dropdown'

const DropdownContent = ({
  isOpen,
  options,
  handleOptionSelect,
  isCheckbox,
}: {
  isOpen: boolean
  options: DropdownOption[]
  handleOptionSelect: (value: string | number) => () => void
  isCheckbox?: boolean
}) => {
  return (
    <div className={`grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-300`}>
      <ul className={`${isOpen ? '' : 'hidden'} z-10 mt-2 w-full overflow-y-scroll rounded-md border border-gray-200 bg-white shadow-lg`}>
        {options.map((option) => (
          <li
            key={option.value}
            className="flex w-full cursor-pointer list-none flex-wrap items-center gap-2  px-4 py-2 hover:bg-gray-100"
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

export default DropdownContent
