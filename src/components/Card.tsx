import { title } from 'process'
import React from 'react'

interface CardProps {
  title: React.ReactNode
  children: React.ReactNode
  extra?: React.ReactNode
}

export default function Card(props: CardProps) {
  const { title, children, extra } = props
  return (
    <div className="min-h-72 m-8 rounded-lg border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <div className="min-h-full min-w-full p-5 ">
        <div className="flex">
          <h5 className=" mb-2 flex-auto text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
          <div className="flex-none">{extra}</div>
        </div>

        {children}
      </div>
    </div>
  )
}
