import React, { HTMLProps } from 'react'
import Title from '@components/Typography/Title'

interface CardProps extends Omit<HTMLProps<HTMLDivElement>, 'title'> {
  title?: React.ReactNode | undefined
  extra?: React.ReactNode
  className?: string | undefined
}

export default function Card(props: CardProps) {
  const { title, children, extra, className } = props
  return (
    <div className={`min-h-48 min-w-96 relative mb-6 rounded bg-neutral-50 shadow-lg ${className}`}>
      <div className="absolute top-0 right-0 px-6 py-6">{extra}</div>
      <div className="flex-col justify-start gap-6 px-6 py-6">
        <Title level={1} bold>
          {title}
        </Title>
        {children}
      </div>
    </div>
  )
}
