export enum ProductCatalogSortByEnum {
  all = 'all',
  price_high = 'price_high',
  price_low = 'price_low',
}

export type ProductCatalogSortByKeys = keyof typeof ProductCatalogSortByEnum

export type ShopPageSearchParams = {
  productType: string
  bedrooms: string
  locations: string
  sort?: ProductCatalogSortByKeys
}

export interface ProductCatalogSearchParams {
  productType: string[]
  bedrooms: string[]
  locations: string[]
  sort?: ProductCatalogSortByKeys
}

export type SearchProductsPageProps = any & {
  searchParams: ShopPageSearchParams
}

export type PaginatedDocs<T = any> = {
  docs: T[]
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  nextPage?: null | number | undefined
  page?: number
  pagingCounter: number
  prevPage?: null | number | undefined
  totalDocs: number
  totalPages: number
}
