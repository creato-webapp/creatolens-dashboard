import React from 'react'

import { Title } from '@components/Typography'

import { Button } from './Button'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customTitle?: React.ReactNode
  extra?: React.ReactNode
  subExtra?: React.ReactNode
  coverImage?: string
  description?: React.ReactNode
  isDropdown?: boolean
}

export default function Card({ title, children, customTitle, extra, className, coverImage, subExtra, description, onClick, isDropdown }: CardProps) {
  // const { title, children, extra, className, coverImage, subExtra, description, onClick } = props
  return (
    <div className={`flex h-fit  w-full flex-col gap-6 rounded-xl border border-slate-300 p-6 shadow-lg ${className}`}>
      {coverImage ? <img alt="card" className="h-auto w-auto rounded-xl md:shrink-0" src={coverImage} /> : null}
      {subExtra ? <div className="h-auto w-auto">{subExtra}</div> : null}
      {customTitle || description || extra ? (
        <div className="flex">
          {customTitle || extra ? (
            <>
              {customTitle}
              {extra ? (
                isDropdown ? (
                  <div className="ml-2 flex w-full justify-end">{extra}</div>
                ) : (
                  <div className="ml-auto w-auto">{extra}</div>
                )
              ) : null}
            </>
          ) : (
            <Title level={1} bold>
              {title}
            </Title>
          )}
          {description ? <div>{description}</div> : null}
        </div>
      ) : null}
      {onClick ? <Button.Primary className="h-auto self-center">text</Button.Primary> : null}
      {children}
    </div>
  )
}
