import React, { HTMLAttributes, ReactNode } from 'react'

interface UnorderedListProps extends HTMLAttributes<HTMLUListElement> {
  children: ReactNode
}

export const UnorderedList: React.FC<UnorderedListProps> = ({ children, className }) => {
  return <ul className={className}>{children}</ul>
}

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  children: ReactNode
  className?: string
}

export const ListItem: React.FC<ListItemProps> = ({ children, className }) => {
  return <li className={className}>{children}</li>
}
