import React, { useState, ReactNode } from 'react'

interface PopoverProps {
  trigger: ReactNode // The element that triggers the popover
  content: ReactNode // The content to display in the popover
  className: string // The class
}

const Popover: React.FC<PopoverProps> = ({ trigger, content, className }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={`relative inline-block ${className}`}>
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        {trigger}
      </div>
      {isOpen && (
        <div
          className={`absolute z-50 w-64 rounded-lg border border-gray-200 bg-white p-2 text-sm text-gray-500 shadow-sm `}
          style={{
            top: '-5%',
            right: '-5%',
          }}
        >
          <button className="absolute top-0 right-0 cursor-pointer p-1" onClick={() => setIsOpen(!isOpen)}>
            {/* You can replace 'x' with your preferred close icon */}
            <span className="pr-2 text-xl text-gray-500">×</span>
          </button>
          {content}
        </div>
      )}
    </div>
  )
}

export default Popover
