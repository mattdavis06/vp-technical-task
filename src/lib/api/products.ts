import type { ProductsRequest, ProductsResponse } from '@/types/products'

//? Helper function to add artificial delay, just for visual effect, remove in production
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchProducts(
  request: ProductsRequest,
): Promise<ProductsResponse> {
  //? Add 1 second delay to see loading state, remove in production
  await delay(1000)

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
  const apiKey = process.env.NEXT_PUBLIC_API_KEY

  if (!apiBaseUrl || !apiKey) {
    throw new Error('Missing environment variables')
  }

  //? Workaround: API has a bug where pageNumber 1 returns the same data as pageNumber 0
  //? So we skip pageNumber 1: map pageNumber >= 1 to pageNumber + 1
  //? UI Page 1 (0) → API 0, UI Page 2 (1) → API 2, UI Page 3 (2) → API 3, etc.
  const apiPageNumber =
    request.pageNumber >= 1 ? request.pageNumber + 1 : request.pageNumber

  const apiRequest = {
    ...request,
    pageNumber: apiPageNumber,
  }

  const response = await fetch(`${apiBaseUrl}?apikey=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(apiRequest),
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.statusText}`)
  }

  const data = await response.json()

  return data
}
