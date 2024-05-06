import React, { HTMLAttributes } from 'react'
import { Title } from '@components/Typography'
import { Button } from './Button'
import Image from 'next/image'
interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
  extra?: React.ReactNode
  number?: number
  sendNumber?: number
  accountName?: string
  className?: string | undefined
  instaPost?: string
  subTitle?: string
  description?: string
  isDropdown?: boolean
  icon?: string
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
  sendNumber,
  icon,
}: CardProps) {
  return (
    <div className={`flex  w-full flex-col items-center gap-6 border border-slate-300 p-6 shadow-lg md:flex-row ${className}`}>
      <div className="flex w-full md:min-h-128 md:w-1/2">
        {instaPost && (
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            width={320}
            height={320}
            // fill={true}
            alt="instagram post"
            className="w-full object-contain "
            src={instaPost}
          />
        )}
      </div>
      <div>
        {title ? (
          <Title level={1} bold>
            {title}
          </Title>
        ) : null}
        {subTitle ? <div className="h-auto w-auto">{subTitle}</div> : null}
        {sendNumber && <h2 className="font-extrabold text-accent1-500">{sendNumber} sends</h2>}
        {accountName && <div className="">{accountName}</div>}
        {description && <div className="italic text-text-secondary">{description}</div>}
        <div className="flex items-center">
          {icon && <Image src={icon} width={45} height={45} alt={title} />}
          {number && <h2 className=" font-extrabold text-accent1-500">{number}</h2>}
        </div>
        {onClick ? <Button.Primary className="h-auto self-center">text</Button.Primary> : null}
        {children}
      </div>
    </div>
  )
}
