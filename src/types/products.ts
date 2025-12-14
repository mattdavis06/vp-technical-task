//? Product-related TypeScript types and interfaces

export interface ProductsRequest {
  query: string
  pageNumber: number
  size: number
  additionalPages: number
  sort: number
}

export interface ProductImage {
  url: string
  attributes: {
    imageAltText: string
  }
}

export interface BrandImage {
  url: string
  attributes: {
    imageAltText: string
  }
}

export interface Brand {
  brandImage: BrandImage
}

export interface DefaultCategory {
  name: string
  slug: string
}

export interface Price {
  currencyCode: string
  priceIncTax: number
  priceExcTax: number
  isOnPromotion: boolean
  monthlyFinanceEstimate: number
}

export interface StockStatus {
  statue: string
}

export interface ProductAttributes {
  isBestSeller?: boolean
}

export interface Product {
  id: string
  productName: string
  image: ProductImage
  brand: Brand
  defaultCategory: DefaultCategory
  price: Price
  averageRating: number
  stockStatus: StockStatus
  attributes: ProductAttributes
}

export interface PaginationInfo {
  from: number
  size: number
  total: number
  sortType: number
}

export interface ProductsResponse {
  products: Product[]
  pagination: PaginationInfo
  facets?: unknown[]
  [key: string]: unknown
}
