import { useEffect, useMemo, useRef, useState } from 'react'

const Checkbox = ({ hasError = false, indeterminate = false, inactive = false, text = '' }) => {
  const [checked, setChecked] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate
    }
  }, [indeterminate])

  const handleChange = () => {
    if (!indeterminate) {
      setChecked(!checked)
    }
  }

  const bgColor = useMemo(() => {
    if (checked) {
      return hasError ? 'bg-error-600' : 'bg-accent1-500'
    }
    if (indeterminate) {
      return hasError ? 'bg-error-500' : 'bg-accent1-500'
    }
    return ''
  }, [checked, indeterminate, hasError])

  const borderColor = useMemo(() => {
    if (checked) return
    if (indeterminate) return
    return hasError ? 'border-error-500 border-2 border-solid' : 'border-stroke border-2 border-solid'
  }, [checked, hasError, indeterminate])

  const textColor = useMemo(() => {
    if (hasError) {
      if (indeterminate) return 'text-text-secondary'
      return checked ? 'text-error-600' : 'text-error-500'
    } else {
      return 'text-text-secondary'
    }
  }, [checked, hasError, indeterminate])

  return (
    <div className={`group flex flex-row items-center ${inactive ? 'opacity-30' : ''}`}>
      <div className={` flex h-7 w-7 items-center justify-center rounded-sm group-hover:bg-accent1-100`}>
        <input
          type="checkbox"
          disabled={inactive}
          ref={inputRef}
          checked={checked}
          onChange={handleChange}
          className={`absolute rounded opacity-0 `}
        />
        <div className={`${bgColor} rounded ${borderColor} justify-centerhover:bg-accent1-100 flex h-6 w-6 items-center`}>
          {(checked || indeterminate) && (
            <div className="flex flex-row gap-2">
              <svg className="flex h-6 w-6 items-center justify-center fill-current text-white" viewBox="0 0 20 20">
                {indeterminate ? (
                  <rect x="4" y="9" width="12" height="2" />
                ) : (
                  <path d="M16.707,5.293c-0.391-0.391-1.023-0.391-1.414,0L7,13.586l-2.293-2.293c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l3,3c0.391,0.391,1.023,0.391,1.414,0l9-9C17.098,6.316,17.098,5.684,16.707,5.293z" />
                )}
              </svg>
            </div>
          )}
        </div>
      </div>
      <h4 className={textColor}>{text}</h4>
    </div>
  )
}
export default Checkbox
