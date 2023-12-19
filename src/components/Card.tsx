import React, { HTMLAttributes } from 'react'
import { Title } from '@components/Typography'
import Tag from './Tag'
import { Button } from './Button'

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | undefined
  customTitle?: React.ReactNode
  extra?: React.ReactNode
  subExtra?: React.ReactNode
  className?: string | undefined
  coverImage?: string
  description?: string
  isDropdown?: boolean
}

export default function Card({
  title,
  children,
  customTitle,
  extra,
  className,
  coverImage,
  subExtra,
  description,
  onClick,
  isDropdown = false,
}: CardProps) {
  // const { title, children, extra, className, coverImage, subExtra, description, onClick } = props
  return (
    <div className={`flex h-fit w-full flex-col gap-6 rounded-xl border border-slate-300 p-6 shadow-lg ${className}`}>
      {/* <div className="absolute top-0 right-0 px-6 py-6">{extra}</div> */}
      {coverImage ? <img className="h-auto w-auto rounded-xl md:shrink-0" src={coverImage} /> : null}
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
