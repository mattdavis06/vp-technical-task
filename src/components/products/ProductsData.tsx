'use client'

import { useProductsSuspense } from '@/hooks/useProducts'
import {
  PRODUCTS_ADDITIONAL_PAGES,
  PRODUCTS_PER_PAGE,
  PRODUCTS_SORT,
} from '@/lib/constants'
import { useEffect } from 'react'
import { ProductGrid } from './ProductGrid'

interface ProductsDataProps {
  query: string
  pageNumber: number
  onPaginationInfo?: (info: { total: number; totalPages: number }) => void
}

export function ProductsData({
  query,
  pageNumber,
  onPaginationInfo,
}: ProductsDataProps) {
  const { data } = useProductsSuspense({
    query,
    pageNumber,
    size: PRODUCTS_PER_PAGE,
    additionalPages: PRODUCTS_ADDITIONAL_PAGES,
    sort: PRODUCTS_SORT,
  })

  const pageSize = PRODUCTS_PER_PAGE

  // Use pagination data directly from API response
  const total = data.pagination?.total ?? 0
  const totalPages = total > 0 ? Math.ceil(total / pageSize) : 0

  // Notify parent about pagination info from API
  useEffect(() => {
    if (onPaginationInfo && total > 0) {
      onPaginationInfo({
        total,
        totalPages,
      })
    }
  }, [data.pagination, total, totalPages, onPaginationInfo])

  return <ProductGrid products={data.products} query={query} />
}
