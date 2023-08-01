import CaretLeftIcon from '@components/Icon/CaretLeftIcon'
import CaretRightIcon from '@components/Icon/CaretRightIcon'
import React from 'react'
import { Button } from '@components/Button'
interface PaginationProps {
  isLoading: boolean
  page: number
  size: number
  totalItems: number
  hasNext: boolean
  hasPrev: boolean
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ isLoading, page, size, totalItems, hasNext, hasPrev, onPageChange }) => {
  const totalPages = size ? Math.ceil(totalItems / size) : 1
  if (isLoading) {
    return <div>Loading...</div>
  }
  return (
    <>
      <div className="flex items-center justify-center gap-3">
        <Button.Text
          className={'flex text-text-primary hover:text-text-secondary hover:no-underline'}
          loading={false}
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
        >
          <CaretLeftIcon />
          Previous
        </Button.Text>
        <div>
          {page} / {totalPages}
        </div>
        <Button.Text
          className={'flex text-text-primary hover:text-text-secondary hover:no-underline'}
          loading={false}
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
        >
          Next
          <CaretRightIcon />
        </Button.Text>
      </div>
    </>
  )
}

export default Pagination
