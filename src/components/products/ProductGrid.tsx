'use client'

import type { Product } from '@/types/products'
import { ProductCard } from './ProductCard'

interface ProductGridProps {
  products: Product[]
  query: string
}

export function ProductGrid({ products, query }: ProductGridProps) {
  return (
    <div className='grid grid-cols-2 gap-2 pb-4 md:grid-cols-3 md:gap-4 lg:grid-cols-4'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} query={query} />
      ))}
    </div>
  )
}
