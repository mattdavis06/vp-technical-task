'use client'

import { Suspense, useState, useTransition } from 'react'
import { ThemeToggleWrapper } from '../theme/ThemeToggleWrapper'
import { Tabs, TabsContent } from '../ui/tabs'
import { PaginationControls } from './PaginationControls'
import { ProductTabs } from './ProductTabs'
import { ProductsData } from './ProductsData'
import { ProductsSkeleton } from './skeleton/Skeleton'

export function ProductsContent() {
  const [searchQuery, setSearchQuery] = useState('toilets')
  const [pageNumber, setPageNumber] = useState(0)
  const [totalItems, setTotalItems] = useState<number | null>(null)
  const [totalPages, setTotalPages] = useState<number | null>(null)
  const [isPending, startTransition] = useTransition()

  const handleTabChange = (value: string) => {
    startTransition(() => {
      setSearchQuery(value)
      setPageNumber(0) // Reset to first page when changing tabs
      setTotalItems(null) // Reset total items
      setTotalPages(null) // Reset total pages
    })
  }

  const handlePaginationInfo = (info: {
    total: number
    totalPages: number
  }) => {
    setTotalItems(info.total)
    setTotalPages(info.totalPages)
  }

  const handlePageChange = (newPage: number) => {
    if (newPage < 0) return
    startTransition(() => {
      setPageNumber(newPage)
    })
  }

  return (
    <div className='flex h-full flex-1 flex-col overflow-hidden'>
      <section className='mb-4 flex shrink-0 justify-end'>
        <ThemeToggleWrapper />
      </section>

      {/* //? TABS & PRODUCTS */}
      <Tabs
        value={searchQuery}
        onValueChange={handleTabChange}
        className='flex min-h-0 flex-1 flex-col'
      >
        <section className='mb-4 shrink-0'>
          <ProductTabs disabled={isPending} />
        </section>

        {/* //? PRODUCTS */}
        <section className='flex min-h-0 flex-1 flex-col overflow-hidden'>
          <TabsContent
            value={searchQuery}
            className='min-h-0 flex-1 gap-1 overflow-y-auto'
          >
            {isPending ? (
              <ProductsSkeleton />
            ) : (
              <Suspense
                key={`${searchQuery}-${pageNumber}`}
                fallback={<ProductsSkeleton />}
              >
                <ProductsData
                  key={`${searchQuery}-${pageNumber}`}
                  query={searchQuery}
                  pageNumber={pageNumber}
                  onPaginationInfo={handlePaginationInfo}
                />
              </Suspense>
            )}
          </TabsContent>
        </section>
      </Tabs>

      {/* //? PAGINATION */}
      <PaginationControls
        pageNumber={pageNumber}
        totalPages={totalPages}
        totalItems={totalItems}
        isPending={isPending}
        onPageChange={handlePageChange}
      />
    </div>
  )
}
