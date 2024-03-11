// components/Collapse.tsx
import React, { useState } from 'react'
import { CaretDownIcon, CaretUpIcon } from './Icon'

interface CollapseProps extends React.HTMLAttributes<HTMLDivElement> {
  parent: React.ReactNode
  defaultOpen?: boolean
}

const Collapse: React.FC<CollapseProps> = ({ defaultOpen, parent, children, className }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className={`border shadow ${className}`}>
      <button className="flex w-full bg-bg-dark  px-4 py-4 text-left" onClick={toggleMenu}>
        {parent}
        <div className="ml-auto w-auto"> {isOpen ? <CaretUpIcon /> : <CaretDownIcon />}</div>
      </button>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  )
}

export default Collapse
