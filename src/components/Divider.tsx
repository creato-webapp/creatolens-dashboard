// Create a divider component that can be used to separate content
// The divider should have a height of 1px and a background color of #DDE5EA
const Divider = ({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) => {
  return <hr className={`border-t-DDE5EA m-1 divide-solid border-t-2 ${className}`} {...props} />
}

export default Divider
