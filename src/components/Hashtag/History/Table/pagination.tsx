import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationLink,
} from '@components/ui/Pagination'

type PaginatorProps = {
  currentPage: number
  totalPages: number
  onPageChange: (pageNumber: number) => void
  showPreviousNext: boolean
}

// this implementation can be a bit jumpy for larger tables, but should be good for most and easily adaptable if not
// this file is where your logic for how when ellipses are shown and other fiddly bits

export const generatePaginationLinks = (currentPage: number, totalPages: number, onPageChange: (page: number) => void) => {
  const pages: JSX.Element[] = []
  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem
          key={i}
          className={`${
            i === currentPage ? ' bg-primary-500 text-white' : ' text-text-primary'
          } aspect-square h-10 w-10 rounded-xl !border-none hover:bg-interface-hover hover:text-text-secondary`}
        >
          <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
  } else {
    for (let i = 1; i <= 2; i++) {
      pages.push(
        <PaginationItem
          key={i}
          className={`${
            i === currentPage ? 'bg-primary-500 text-white ' : 'bg-bg-dark text-text-primary'
          } aspect-square h-10 w-10 rounded-lg  hover:bg-interface-hover hover:text-text-secondary`}
        >
          <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    if (2 < currentPage && currentPage < totalPages - 1) {
      pages.push(<PaginationEllipsis />)
      pages.push(
        <PaginationItem
          key={currentPage}
          className={`aspect-square h-10 w-10 rounded-lg bg-primary-500 text-white hover:bg-interface-hover hover:text-text-secondary`}
        >
          <PaginationLink onClick={() => onPageChange(currentPage)} isActive={true}>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
      )
    }
    pages.push(<PaginationEllipsis />)
    for (let i = totalPages - 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i} className="">
          <PaginationLink onClick={() => onPageChange(i)} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
  }
  return pages
}

export default function Paginator({ currentPage, totalPages, onPageChange, showPreviousNext }: PaginatorProps) {
  return (
    <Pagination>
      <PaginationContent>
        {showPreviousNext && totalPages ? (
          <PaginationItem className="cursor-pointer">
            <PaginationPrevious
              onClick={() => onPageChange(currentPage - 1)}
              aria-disabled={currentPage - 1 < 1}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>
        ) : null}
        {generatePaginationLinks(currentPage, totalPages, onPageChange)}
        {showPreviousNext && totalPages ? (
          <PaginationItem className="cursor-pointer">
            <PaginationNext
              onClick={() => onPageChange(currentPage + 1)}
              className={currentPage > totalPages - 1 ? 'pointer-events-none opacity-50' : undefined}
            />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  )
}
