import React, { HTMLAttributes } from 'react'
import { Title } from '@components/Typography'
import Tag from './Tag'
import { Button } from './Button'
import Image from 'next/image'
interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  extra?: React.ReactNode
  repostNumber?: number
  sendNumber?: number
  accountName?: string
  className?: string | undefined
  instaPost?: string
  subTitle?: string
  description?: string
  isDropdown?: boolean
}

export default function CardWithIgPost({
  title,
  children,
  className,
  instaPost,
  accountName,
  subTitle,
  onClick,
  description,
  repostNumber,
  sendNumber,
}: CardProps) {
  return (
    <div className={`flex w-full flex-row gap-6 rounded-xl border border-slate-300 p-6 shadow-lg ${className}`}>
      <div className="relative flex h-full min-h-64 w-1/2">
        {instaPost && (
          <Image sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill={true} alt="instagram post" className="" src={instaPost} />
        )}
      </div>
      <div>
        {title ? (
          <Title level={1} bold>
            {title}
          </Title>
        ) : null}
        {subTitle ? <div className="h-auto w-auto">{subTitle}</div> : null}
        {repostNumber && <h2 className=" font-extrabold text-accent1-500">{repostNumber} reposts</h2>}
        {sendNumber && <h2 className="font-extrabold text-accent1-500">{sendNumber} sends</h2>}
        {accountName && <div className="">{accountName}</div>}
        {description && <div className="">{description}</div>}
        {onClick ? <Button.Primary className="h-auto self-center">text</Button.Primary> : null}
        {children}
      </div>
    </div>
  )
}
