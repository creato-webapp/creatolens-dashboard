import { PaginationMetadata } from '@hooks/usePagination'
import React, { useCallback } from 'react'
interface PaginationProps<T> {
  isLoading: boolean
  onPrevClick: () => void
  onNextClick: () => void
  onPageClick: (arg: number) => void
  data: PaginationMetadata<T>
}

const Pagination = <T,>({ data, onPrevClick, onNextClick, onPageClick }: PaginationProps<T>) => {
  const { total_items, size, page } = data

  const totalPages = size ? Math.ceil(total_items / size) : 0
  const pagesToShow = 4

  const generatePageNumbers = useCallback(() => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }, [totalPages])

  const pageNumbers = generatePageNumbers()

  const renderPageButton = (arg: number) => {
    return (
      <button
        key={arg}
        className={`${
          arg === page ? 'bg-accent1-500 text-white ' : 'bg-bg-dark text-text-primary'
        } aspect-square h-10 w-10 rounded-lg  hover:bg-interface-hover hover:text-text-secondary`}
        onClick={() => onPageClick(arg)}
      >
        <h4>{arg}</h4>
      </button>
    )
  }

  return (
    <div className="mt-4 flex w-full items-center justify-center gap-3 md:mt-0">
      <div className="flex flex-row gap-2">
        <button
          className={` h-10 w-10 rounded-lg bg-bg-dark text-text-primary disabled:bg-bg-disabled disabled:text-disabled `}
          onClick={onPrevClick}
          disabled={page <= 1}
          key={`prev-${page}`}
        >
          {'<'}
        </button>
        <div className="flex flex-row gap-2">
          {renderPageButton(1)}
          {pageNumbers
            .slice(
              Math.max(1, Math.min(page - Math.floor(pagesToShow / 2), totalPages - pagesToShow - 1)),
              Math.min(page + Math.floor(pagesToShow / 2), totalPages - 1)
            )
            .map((pageNumber) => renderPageButton(pageNumber))}

          {renderPageButton(totalPages)}
        </div>

        <button
          className={`h-10 w-10 rounded-lg bg-bg-dark text-text-primary disabled:bg-bg-disabled disabled:text-disabled `}
          onClick={onNextClick}
          disabled={page >= totalPages}
          key={`next-${page}`}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Pagination
