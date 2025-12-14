import { fetchProducts } from '@/lib/api/products'
import type { ProductsRequest } from '@/types/products'
import { useSuspenseQuery } from '@tanstack/react-query'

export function useProductsSuspense(request: ProductsRequest) {
  return useSuspenseQuery({
    queryKey: [
      'products',
      request.query,
      request.pageNumber,
      request.size,
      request.additionalPages,
      request.sort,
    ],
    queryFn: () => fetchProducts(request),
  })
}
