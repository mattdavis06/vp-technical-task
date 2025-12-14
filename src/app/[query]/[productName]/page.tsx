'use client'

import { useProductsSuspense } from '@/hooks/useProducts'
import {
  PRODUCTS_ADDITIONAL_PAGES,
  PRODUCTS_PER_PAGE,
  PRODUCTS_SORT,
} from '@/lib/constants'
import { use } from 'react'

function ProductDetail({
  query,
  productName,
}: {
  query: string
  productName: string
}) {
  const { data } = useProductsSuspense({
    query,
    pageNumber: 0,
    size: PRODUCTS_PER_PAGE * 5,
    additionalPages: PRODUCTS_ADDITIONAL_PAGES,
    sort: PRODUCTS_SORT,
  })

  const decodedProductName = decodeURIComponent(productName)
  const product = data.products.find(
    (p) => p.productName === decodedProductName,
  )

  if (!product) {
    return (
      <div className='container mx-auto max-w-7xl px-4 py-8'>
        <h1 className='text-2xl font-bold'>Product Not Found</h1>
      </div>
    )
  }

  return (
    <div className='container mx-auto max-w-7xl px-4 py-8'>
      <h1 className='text-2xl font-bold'>{product.productName}</h1>
    </div>
  )
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ query: string; productName: string }>
}) {
  const { query, productName } = use(params)
  return <ProductDetail query={query} productName={productName} />
}
