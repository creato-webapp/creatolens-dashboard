interface INavigationPillProps {
  value: string
  name: string
  onSelect: (value: string) => () => void
  selected?: boolean
}

const NavigationPill = (props: INavigationPillProps) => {
  const { value, name, onSelect, selected } = props
  return (
    <button className={`text-nowrap rounded-lg p-2 ${selected ? 'bg-neutral-200 text-primary-500' : ''}`} key={value} onClick={onSelect(value)}>
      {name}
    </button>
  )
}

export default NavigationPill
