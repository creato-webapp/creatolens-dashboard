import { title } from 'process'
import React from 'react'

interface CardProps {
  title: string
  children: React.ReactNode
}

export default function Card(props: CardProps) {
  const { title, children } = props
  return (
    <div className="min-h-72 bg-white shadow-md border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 m-8">
      <div className="p-5 min-w-full min-h-full ">
        <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2 dark:text-white">
          {title}
        </h5>
        {children}
      </div>
    </div>
  )
}
