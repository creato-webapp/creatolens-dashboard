import React, { ReactNode, useCallback, useState } from 'react'

interface PopoverProps {
  trigger: ReactNode
  content: ReactNode
  className: string
}

const Popover: React.FC<PopoverProps> = ({ trigger, content, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const togglePopover = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  return (
    <div onClick={togglePopover} className={`relative inline-block cursor-pointer ${className}`}>
      <div>{trigger}</div>
      {isOpen && (
        <div
          className={`absolute z-50 w-64 rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-500 shadow-sm `}
          style={{
            top: '-5%',
            right: '-5%',
          }}
        >
          <button className="absolute right-0 top-0 cursor-pointer p-1" onClick={togglePopover}>
            <span className="pr-2 text-xl text-gray-500">×</span>
          </button>
          {content}
        </div>
      )}
    </div>
  )
}

export default Popover
