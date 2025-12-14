'use client'

import { PRODUCTS_PER_PAGE } from '@/lib/constants'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination'

interface PaginationControlsProps {
  pageNumber: number
  totalPages: number | null
  totalItems: number | null
  isPending: boolean
  onPageChange: (newPage: number) => void
}

export function PaginationControls({
  pageNumber,
  totalPages,
  totalItems,
  isPending,
  onPageChange,
}: PaginationControlsProps) {
  const handlePageChange = (newPage: number) => {
    if (newPage < 0) return
    onPageChange(newPage)
  }

  const pageSize = PRODUCTS_PER_PAGE
  const start = pageNumber * pageSize + 1
  const end = totalItems
    ? Math.min((pageNumber + 1) * pageSize, totalItems)
    : (pageNumber + 1) * pageSize

  return (
    <section className='bg-background shrink-0 space-y-2 border-t pt-2'>
      {/* Page Navigation */}
      {totalPages !== null && totalPages > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  if (pageNumber > 0 && !isPending) {
                    handlePageChange(pageNumber - 1)
                  }
                }}
                className={
                  pageNumber === 0 || isPending
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
            {(() => {
              const currentPage = pageNumber + 1
              const pages: (number | 'ellipsis')[] = []

              if (totalPages <= 5) {
                // Show all pages if total is small
                for (let i = 1; i <= totalPages; i++) {
                  pages.push(i)
                }
              } else {
                // Always show: 1, 2, 3, ..., last page
                pages.push(1)
                pages.push(2)
                pages.push(3)

                if (currentPage <= 3) {
                  // On pages 1-3, just show ellipsis and last
                  pages.push('ellipsis')
                  pages.push(totalPages)
                } else if (currentPage >= totalPages - 2) {
                  // Near the end, show ellipsis then last few pages
                  pages.push('ellipsis')
                  for (let i = totalPages - 2; i <= totalPages; i++) {
                    pages.push(i)
                  }
                } else {
                  // In the middle, show current page with context
                  pages.push('ellipsis')
                  pages.push(currentPage)
                  pages.push('ellipsis')
                  pages.push(totalPages)
                }
              }

              return pages.map((page, index) => (
                <PaginationItem key={index}>
                  {page === 'ellipsis' ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      href='#'
                      isActive={page === currentPage}
                      onClick={(e) => {
                        e.preventDefault()
                        if (!isPending && page !== currentPage) {
                          handlePageChange(page - 1)
                        }
                      }}
                      className={
                        isPending
                          ? 'pointer-events-none opacity-50'
                          : 'cursor-pointer'
                      }
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))
            })()}
            <PaginationItem>
              <PaginationNext
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  if (
                    !isPending &&
                    totalPages !== null &&
                    pageNumber + 1 < totalPages
                  ) {
                    handlePageChange(pageNumber + 1)
                  }
                }}
                className={
                  isPending ||
                  totalPages === null ||
                  pageNumber + 1 >= totalPages
                    ? 'pointer-events-none opacity-50'
                    : 'cursor-pointer'
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* Showing X items */}
      {totalItems !== null && totalItems > 0 && (
        <div className='text-center'>
          <span className='text-secondary-foreground text-sm'>
            Showing {start}
            {start !== end ? `-${end}` : ''} of {totalItems}
          </span>
        </div>
      )}
    </section>
  )
}
