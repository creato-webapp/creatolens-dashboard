import { title } from 'process'
import React, { HTMLProps } from 'react'

interface CardProps extends HTMLProps<HTMLDivElement> {
  title?: string | undefined
  children: React.ReactNode
  extra?: React.ReactNode
}

export default function Card(props: CardProps) {
  const { title, children, extra } = props
  return (
    <div className="min-h-96 min-w-96 inline-flex flex-col  justify-start gap-6 rounded bg-neutral-50 px-9 py-16 shadow">
      <div className="flex flex-col items-start justify-start gap-2.5 p-2.5">
        <div className="flex">
          <h5 className="mb-2 flex-auto text-2xl font-bold tracking-tight text-gray-900">
            {title}
          </h5>
          <div className="flex-none">{extra}</div>
        </div>
        {children}
      </div>
    </div>
  )
}
