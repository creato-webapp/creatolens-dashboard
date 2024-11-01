import { cn } from '@utils/index'

interface INavigationPillProps {
  value: string | number
  name: string
  onSelect: (value: string | number) => void
  selected?: boolean
}

const NavigationPill = (props: INavigationPillProps) => {
  const { value, name, onSelect, selected } = props

  const handleClick = () => {
    onSelect(value)
  }

  return (
    <button className={cn(`text-nowrap rounded-lg p-2 ${selected ? 'bg-neutral-200 text-primary-500' : ''}`)} key={value} onClick={handleClick}>
      {name}
    </button>
  )
}

export default NavigationPill
