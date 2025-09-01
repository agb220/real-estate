'use client'
import { useEffect, useMemo, useState } from 'react'
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard from '../shared/ProductCard'
import Input from '../shared/Input'
import Select, { IOption } from '../shared/Select'
import Button from '../shared/Button'
import { useSearch } from '../../_context/SearchContext'
import { ProductCatalogSearchParams, ProductCatalogSortByEnum } from '@/utilities/types'
import { updateStateIfChanged } from '@/utilities/updateStateIfChanged'
import { SearchSvg } from '../icons'

export interface QsStringifyOptions {
  skipEmptyString?: boolean
  skipNull?: boolean
  arrayFormat?: 'indices' | 'brackets' | 'repeat' | 'comma'
}

const OffersBlock = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSearching, setIsSearching] = useState(false)

  const {
    products,
    loading,
    loadProducts,
    filterData,
    locationInput,
    setLocationInput,
    selectedTypeOption,
    setSelectedTypeOption,
    selectedBedroomsOption,
    setSelectedBedroomsOption,
    sort,
    resetSearch,
    setSelectedSearchParams,
  } = useSearch()

  const currentParams = useMemo(() => {
    return qs.parse(searchParams.toString(), {
      ...({ arrayFormat: 'comma', parseNumbers: true } as any),
    }) as unknown as ProductCatalogSearchParams
  }, [searchParams])

  const mapDocsToOptions = (arr?: { id: string; name: string }[]): IOption[] =>
    arr?.map((val) => ({ id: val.id, name: val.name })) || []

  const mapSortEnumToOptions = (): IOption[] => [
    { id: 'price_high', name: 'Expensive at first' },
    { id: 'price_low', name: 'Cheaper at first' },
  ]

  const handleSearch = async () => {
    setIsSearching(true)

    const locationDoc = filterData?.locations?.docs.find(
      (doc) => doc.name.toLowerCase() === locationInput.toLowerCase(),
    )
    const locationId = locationDoc ? locationDoc.id : undefined

    const updatedParams: ProductCatalogSearchParams = {
      locations: locationId ? [locationId] : locationInput.trim() === '' ? [] : [locationInput],
      productType: selectedTypeOption,
      bedrooms: selectedBedroomsOption,
      sort,
    }

    setSelectedSearchParams && setSelectedSearchParams(updatedParams)

    const queryString = qs.stringify(updatedParams, {
      skipEmptyString: true,
      skipNull: true,
      arrayFormat: 'comma',
    })
    router.push(`${window.location.pathname}${queryString ? `?${queryString}` : ''}`, {
      scroll: false,
    })
  }

  useEffect(() => {
    if (!currentParams) return

    updateStateIfChanged(currentParams.productType, selectedTypeOption, setSelectedTypeOption)
    updateStateIfChanged(currentParams.bedrooms, selectedBedroomsOption, setSelectedBedroomsOption)

    const locationsParam = Array.isArray(currentParams.locations)
      ? currentParams.locations
      : currentParams.locations
        ? [currentParams.locations]
        : []

    if (locationsParam.length) {
      const locValue = locationsParam[0]
      const locationDocById = filterData?.locations?.docs.find((doc) => doc.id === locValue)

      if (locationDocById) {
        setLocationInput(locationDocById.name)
      } else {
        setLocationInput(String(locValue))
      }
    } else {
      setLocationInput('')
    }
  }, [currentParams, filterData])

  const handleSortChange = async (val: IOption) => {
    const updatedParams: ProductCatalogSearchParams = {
      ...currentParams,
      sort: val?.id as ProductCatalogSortByEnum,
    }

    setSelectedSearchParams && setSelectedSearchParams(updatedParams)

    const queryString = qs.stringify(updatedParams, {
      skipEmptyString: true,
      skipNull: true,
      arrayFormat: 'comma',
    })
    router.push(`${window.location.pathname}${queryString ? `?${queryString}` : ''}`, {
      scroll: false,
    })
  }

  const handleResetFilters = async () => {
    resetSearch()
    const resetParams: ProductCatalogSearchParams = {
      locations: [],
      productType: [],
      bedrooms: [],
      sort: undefined,
    }
    setSelectedSearchParams && setSelectedSearchParams(resetParams)
    setIsSearching(false)

    router.push('/offers')
  }

  const isButtonDisabled =
    isSearching ||
    (!locationInput.trim() && !selectedTypeOption?.[0] && !selectedBedroomsOption?.[0])

  useEffect(() => {
    if (isSearching) {
      setIsSearching(false)
    }
  }, [products])

  const handleLoadMore = () => {
    loadProducts({
      page: (products?.page || 1) + 1,
    }).then(() => {})
  }

  const getUniqueBedrooms = () => {
    const uniqueRoomNumbers = [
      ...new Set(products?.docs.map((product) => product.productDetails.roomNumbers)),
    ].sort()
    return uniqueRoomNumbers.map((num) => ({ id: num, name: num }))
  }

  return (
    <section className="offers">
      <div className="offers__container">
        <h1 className="offers__title">Search for an offer</h1>
        <div className="offers__filters">
          <Input
            icon
            placeholder="Search of location"
            value={locationInput}
            onChange={(e: any) => {
              setLocationInput(e.target.value)
            }}
            className="input-offers"
            onBlur={() => {}}
          />
          <Select
            options={mapDocsToOptions(filterData?.productType?.docs)}
            label="Property type"
            value={
              mapDocsToOptions(filterData?.productType?.docs).find(
                (opt) => opt.id === selectedTypeOption[0],
              ) || null
            }
            onChange={(val) => setSelectedTypeOption([val.id])}
            className="offers--select"
          />
          <Select
            options={getUniqueBedrooms()}
            label="Bedrooms"
            value={getUniqueBedrooms().find((opt) => opt.id === selectedBedroomsOption[0]) || null}
            onChange={(val) => val && setSelectedBedroomsOption([val.id])}
            className="offers--select"
          />
          <Button
            typeBtn="btn"
            titlebtn={isSearching ? 'Searching...' : 'Search'}
            icon={!isSearching ? <SearchSvg /> : <></>}
            onClick={handleSearch}
            className="btn-offers-search"
            disabled={isButtonDisabled}
          />
          <Button
            typeBtn="outline"
            titlebtn="Reset"
            onClick={handleResetFilters}
            className="btn-offers-reset"
            disabled={loading}
          />
        </div>
      </div>
      <div className="offers__line"></div>
      <div className="offers__container">
        <div className="offers__sorting">
          <div className="offers__counter">
            {products && products?.docs.length} <span>results found</span>
          </div>
          <Select
            options={mapSortEnumToOptions()}
            label="Sort by"
            className="offers--select"
            value={mapSortEnumToOptions().find((opt) => opt.id === sort) || null}
            onChange={handleSortChange}
          />
        </div>

        <div className="offers__products products">
          <div className="products__wrapper">
            {products &&
              products?.docs?.map((product, i) => <ProductCard key={i} product={product} />)}
          </div>
        </div>
        {products?.hasNextPage && (
          <Button
            typeBtn="outline"
            titlebtn={loading ? 'Loading...' : 'Show more'}
            onClick={handleLoadMore}
            disabled={loading}
          />
        )}
      </div>
    </section>
  )
}

export default OffersBlock
