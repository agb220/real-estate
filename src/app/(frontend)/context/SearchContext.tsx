'use client'

import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { Product } from '@/payload-types'
import { FilterDataResponse } from '@/app/(payload)/_collections/product/Product'
import { ProductCatalogSearchParams } from '@/utilities/types'

interface SearchContextType {
  products: Product[]
  filterData?: FilterDataResponse
  searchParams: ProductCatalogSearchParams
  setSearchParams: (params: ProductCatalogSearchParams) => void
  fetchProducts: (params?: ProductCatalogSearchParams) => Promise<void>
  resetSearch: () => void
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([])
  const [filterData, setFilterData] = useState<FilterDataResponse | undefined>()
  const [searchParams, setSearchParams] = useState<ProductCatalogSearchParams>({
    sort: undefined,
    productType: [],
    bedrooms: [],
    locations: [],
  })

  const fetchProducts = useCallback(
    async (params?: ProductCatalogSearchParams) => {
      const appliedParams = params || searchParams
      setSearchParams(appliedParams)

      const query = new URLSearchParams()
      if (appliedParams.sort) query.append('sort', appliedParams.sort)
      if (appliedParams.productType.length)
        query.append('productType', appliedParams.productType.join(','))
      if (appliedParams.bedrooms.length) query.append('bedrooms', appliedParams.bedrooms.join(','))
      if (appliedParams.locations.length)
        query.append('locations', appliedParams.locations.join(','))

      const productsRes = await fetch(`/api/products?${query}`)
      const productsJson = await productsRes.json()
      setProducts(productsJson.docs || [])

      if (!filterData) {
        const filterRes = await fetch(`/api/products/filter-data`)
        const filterJson = await filterRes.json()
        setFilterData(filterJson)
      }
    },
    [searchParams, filterData],
  )

  const resetSearch = () => {
    setSearchParams({
      sort: undefined,
      productType: [],
      bedrooms: [],
      locations: [],
    })
    setProducts([])
  }

  return (
    <SearchContext.Provider
      value={{
        products,
        filterData,
        searchParams,
        setSearchParams,
        fetchProducts,
        resetSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}
