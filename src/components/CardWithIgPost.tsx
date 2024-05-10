import React, { HTMLAttributes } from 'react'
import { Title } from '@components/Typography'
import { Button } from './Button'
import Image from 'next/image'
import Skeleton from 'react-loading-skeleton'
interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  extra?: React.ReactNode
  number?: number
  accountName?: string
  className?: string | undefined
  instaPost?: string
  subTitle?: string
  description?: string
  isDropdown?: boolean
  icon?: string
  isLoading?: boolean
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
  number,
  icon,
  isLoading,
}: CardProps) {
  return (
    <div className={`flex  w-full flex-col items-center gap-6 border border-slate-300 p-6 shadow-lg md:flex-row ${className}`}>
      <div className="relative flex min-h-64  w-full items-center justify-center md:min-h-128">
        {instaPost && (
          <img
            // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            // fill={true}
            // className=
            alt="instagram post"
            className="flex h-full w-full object-contain"
            src={instaPost}
          />
        )}
      </div>
      <div className="flex w-full flex-col">
        {title ? (
          <Title level={1} bold>
            {title}
          </Title>
        ) : null}
        {subTitle ? <div className="h-auto w-auto">{subTitle}</div> : null}
        {accountName && <div className="">{accountName}</div>}
        {description && <div className="italic text-text-secondary">{description}</div>}
        <div className="flex items-center">
          {icon && <Image src={icon} width={45} height={45} alt={'repost number'} />}
          <h2 className=" flex font-extrabold text-accent1-500">
            {isLoading ? (
              <div className="flex w-12">
                <Skeleton containerClassName="flex-1" />
              </div>
            ) : (
              number
            )}
          </h2>
        </div>
        {onClick ? <Button.Primary className="h-auto self-center">text</Button.Primary> : null}
        {children}
      </div>
    </div>
  )
}
