'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  PropsWithChildren,
  useEffect,
} from 'react'
import qs from 'qs'
import { PaginatedDocs } from 'payload'
import { Product } from '@/payload-types'
import { FilterDataResponse } from '@/app/(payload)/_collections/product/Product'
import { ProductCatalogSearchParams, ProductCatalogSortByKeys } from '@/utilities/types'

export const MOCK_LIMIT_PRODUCT = 6

interface SearchContextType {
  products?: PaginatedDocs<Product>
  setProducts: (products: PaginatedDocs<Product>) => void
  loading: boolean
  setLoading: (val: boolean) => void
  filterData?: FilterDataResponse
  setFilterData?: (val: FilterDataResponse) => void
  searchParams?: ProductCatalogSearchParams
  setSearchParams?: (params: ProductCatalogSearchParams) => void

  selectedSearchParams?: ProductCatalogSearchParams
  setSelectedSearchParams?: (val: ProductCatalogSearchParams) => void

  locationInput: string
  setLocationInput: (val: string) => void

  selectedTypeOption: ProductCatalogSearchParams['productType']
  setSelectedTypeOption: (val: ProductCatalogSearchParams['productType']) => void

  selectedBedroomsOption: ProductCatalogSearchParams['bedrooms']
  setSelectedBedroomsOption: (val: ProductCatalogSearchParams['bedrooms']) => void

  sort?: ProductCatalogSortByKeys
  setSort: (val?: ProductCatalogSortByKeys) => void

  loadProducts: (params: { page?: number }) => Promise<void>

  resetSearch: () => void
}

interface SearchProviderProps extends PropsWithChildren {
  products?: PaginatedDocs<Product>
  filterData?: FilterDataResponse
  selectedSearchParams?: ProductCatalogSearchParams
}

const SearchContext = createContext<SearchContextType | undefined>(undefined)

export const SearchProvider = (props: SearchProviderProps) => {
  const [products, setProducts] = useState<PaginatedDocs<Product> | undefined>(props.products)
  const [filterData, setFilterData] = useState<FilterDataResponse | undefined>(props.filterData)
  const [selectedSearchParams, setSelectedSearchParams] = useState<
    ProductCatalogSearchParams | undefined
  >(props.selectedSearchParams)

  const [locationInput, setLocationInput] = useState<string>('')
  const [selectedTypeOption, setSelectedTypeOption] = useState<
    ProductCatalogSearchParams['productType']
  >(selectedSearchParams?.productType || [])

  const [selectedBedroomsOption, setSelectedBedroomsOption] = useState<
    ProductCatalogSearchParams['bedrooms']
  >(selectedSearchParams?.bedrooms || [])

  const [sort, setSort] = useState<ProductCatalogSortByKeys | undefined>(selectedSearchParams?.sort)
  const [loading, setLoading] = useState<boolean>(false)

  const loadProducts = async (params: { page?: number }) => {
    setLoading(true)
    try {
      let searchRequestParams: any = {
        where: {},
        sort: [],
      }

      if (selectedSearchParams) {
        searchRequestParams = generateRequestQuery(selectedSearchParams)
      }
      const requestQuery = qs.stringify({
        pagination: true,
        depth: 3,
        limit: MOCK_LIMIT_PRODUCT,
        page: params.page,
        sort: searchRequestParams.sort.length ? searchRequestParams.sort[0] : undefined,
        where: searchRequestParams.where,
      })
      const response = await fetch(`/api/products?${requestQuery}`)
      const searchProducts = (await response.json()) as PaginatedDocs<Product>

      setLoading(false)
      if (searchProducts && searchProducts.page === 1) {
        setProducts({
          ...searchProducts,
        })
        return
      }
      const totalDocs = [...(products?.docs || []), ...searchProducts.docs]

      setProducts({
        ...searchProducts,
        docs: totalDocs,
      })
    } catch (err) {
      setLoading(false)
    }
  }

  const resetSearch = useCallback(() => {
    setLocationInput('')
    setSelectedTypeOption([])
    setSelectedBedroomsOption([])
    setSort(undefined)
  }, [])

  useEffect(() => {
    setFilterData(props.filterData)
    setProducts(props.products)
  }, [props.products, props.filterData])

  useEffect(() => {
    if (!filterData || !selectedSearchParams) return

    const locationId = selectedSearchParams.locations?.[0]
    if (locationId) {
      const locDoc = filterData.locations.docs.find((doc) => doc.id === locationId)
      setLocationInput(locDoc ? locDoc.name : '')
    } else {
      setLocationInput('')
    }

    setSelectedSearchParams(selectedSearchParams)
    setSelectedBedroomsOption(props.selectedSearchParams?.bedrooms || [])
    setSelectedTypeOption(props.selectedSearchParams?.productType || [])

    setSort(props.selectedSearchParams?.sort)
  }, [props.selectedSearchParams])

  return (
    <SearchContext.Provider
      value={{
        products,
        setProducts,
        filterData,
        setFilterData,
        selectedSearchParams,
        setSelectedSearchParams,

        loading,
        setLoading,

        locationInput,
        setLocationInput,
        selectedTypeOption,
        setSelectedTypeOption,
        selectedBedroomsOption,
        setSelectedBedroomsOption,

        sort,
        setSort,

        loadProducts,
        resetSearch,
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => {
  const ctx = useContext(SearchContext)
  if (!ctx) throw new Error('useSearch must be used within SearchProvider')
  return ctx
}

export const generateRequestQuery = (searchObj: ProductCatalogSearchParams) => {
  const sortParams: string[] = []

  if (searchObj?.sort === 'price_high') {
    sortParams.push('-productDetails.prices.fullPrice')
  }
  if (searchObj?.sort === 'price_low') {
    sortParams.push('productDetails.prices.fullPrice')
  }

  const bedrooms = Array.isArray(searchObj?.bedrooms) ? searchObj.bedrooms : []
  const locations = Array.isArray(searchObj?.locations) ? searchObj.locations : []
  const productType = Array.isArray(searchObj?.productType) ? searchObj.productType : []

  let whereState: Record<string, any> = {}

  if (bedrooms.length) {
    whereState = {
      ...whereState,
      'productDetails.roomNumbers': { in: bedrooms },
    }
  }
  if (locations.length) {
    whereState = {
      ...whereState,
      'main.location': { in: locations },
    }
  }
  if (productType.length) {
    whereState = {
      ...whereState,
      'main.type': { in: productType },
    }
  }

  return { sort: sortParams, where: whereState }
}
