import React, { useCallback } from 'react'
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
  const totalPages = size ? Math.ceil(totalItems / size) : 0
  const pagesToShow = 4

  const generatePageNumbers = useCallback(() => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i)
    }
    return pageNumbers
  }, [totalPages])

  if (isLoading) {
    return <div>Loading...</div>
  }
  const handlePrevClick = useCallback(() => {
    if (hasPrev) {
      onPageChange(page - 1)
    }
  }, [hasPrev, onPageChange, page])

  const handleNextClick = useCallback(() => {
    if (hasNext) {
      onPageChange(page + 1)
    }
  }, [hasNext, onPageChange, page])

  const handlePageClick = useCallback(
    (page: number) => () => {
      onPageChange(page)
    },
    []
  )

  const pageNumbers = generatePageNumbers()

  const renderPageButton = (pageNumber: number) => {
    return (
      <button
        key={pageNumber}
        className={`${
          pageNumber === page ? 'bg-accent1-500 text-white ' : 'bg-bg-dark text-text-primary'
        } aspect-square h-10 w-10 rounded-lg  hover:bg-interface-hover hover:text-text-secondary`}
        onClick={handlePageClick(pageNumber)}
      >
        <h4>{pageNumber}</h4>
      </button>
    )
  }

  console.log(
    pageNumbers.slice(
      Math.max(1, Math.min(page - Math.floor(pagesToShow / 2), totalPages - pagesToShow)),
      Math.min(page + Math.floor(pagesToShow / 2), totalPages - 1)
    )
  )

  return (
    <div className="mt-4 flex w-full items-center justify-center gap-3 md:mt-0">
      <div className="flex flex-row gap-2">
        <button
          className={` h-10 w-10 rounded-lg bg-bg-dark text-text-primary disabled:bg-bg-disabled disabled:text-disabled `}
          onClick={handlePrevClick}
          disabled={page <= 1}
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
          onClick={handleNextClick}
          disabled={page >= totalPages}
        >
          {'>'}
        </button>
      </div>
    </div>
  )
}

export default Pagination
