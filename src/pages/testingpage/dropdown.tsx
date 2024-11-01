import Dropdown from '@components/Form/Dropdown/Dropdown'

const DropdownPage = () => {
  return (
    <div>
      <Dropdown options={[]} />
      <Dropdown
        options={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
          { label: 'Option 4', value: 'option4' },
          { label: 'Option 5', value: 'option5' },
        ]}
      />
    </div>
  )
}

export default DropdownPage
