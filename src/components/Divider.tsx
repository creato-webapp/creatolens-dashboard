// Create a divider component that can be used to separate content
// The divider should have a height of 1px and a background color of #DDE5EA
const Divider = ({ margin = "1px" }) => {
  return (
    <div>
      <div style={{ height: '1px', backgroundColor: '#DDE5EA', margin: margin }} />
    </div>
  )
}

export default Divider
