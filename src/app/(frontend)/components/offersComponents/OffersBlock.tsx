'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Product } from '@/payload-types'
import ProductCard from '../shared/ProductCard'
import Input from '../shared/Input'
import { FilterDataResponse } from '@/app/(payload)/_collections/product/Product'
import { ProductCatalogSearchParams, ProductCatalogSortByEnum } from '@/utilities/types'
import Select, { IOption } from '../shared/Select'
import Button from '../shared/Button'
import { SearchSvg } from '../icons'

export const MOCK_LIMIT_PRODUCT = 12

interface OffersBlockProps {
  data: Product[]
  filterData?: FilterDataResponse
  selectedSearchParams?: ProductCatalogSearchParams
}

const formatLabel = (value: string): string => {
  switch (value) {
    case 'price_high':
      return 'Expensive at first'
    case 'price_low':
      return 'Cheaper at first'
    default:
      return value.charAt(0).toUpperCase() + value.slice(1).replace('_', ' ')
  }
}

const mapDocsToOptions = (arr: { id: string; name: string }[] | undefined): IOption[] => {
  if (!arr || !Array.isArray(arr)) return []
  return arr.map((val) => ({
    id: val.id,
    name: val.name,
  }))
}

const mapSortEnumToOptions = (): IOption[] => {
  return Object.values(ProductCatalogSortByEnum).map((val) => ({
    id: val,
    name: formatLabel(val),
  }))
}

const OffersBlock = ({ data, filterData, selectedSearchParams }: OffersBlockProps) => {
  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [selectedBedrooms, setSelectedBedrooms] = useState<string[]>([])
  const [selectedTypeOption, setSelectedTypeOption] = useState<IOption | null>(null)
  const [selectedBedroomsOption, setSelectedBedroomsOption] = useState<IOption | null>(null)
  const [locationInput, setLocationInput] = useState<string>('')
  const [selectedSort, setSelectedSort] = useState<string>(selectedSearchParams?.sort || 'all')

  const locations = filterData?.locations?.docs || []

  const buildQueryParams = () => {
    const query = new URLSearchParams()

    if (locationInput.trim()) {
      const matchedLocation = locations.find(
        (loc) => loc?.name?.toLowerCase().trim() === locationInput?.toLowerCase().trim(),
      )
      query.append('locations', matchedLocation?.id ?? locationInput.trim().toLowerCase())
    }

    if (selectedType.length) {
      query.append('productType', selectedType.join(','))
    }

    if (selectedBedrooms.length) {
      query.append('bedrooms', selectedBedrooms.join(','))
    }

    if (selectedSort) {
      query.append('sort', selectedSort)
    }

    return query.toString()
  }

  const handleSortChange = (val: IOption) => {
    setSelectedSort(val.id)
    router.push(`/offers?${buildQueryParams()}`)
  }

  const handleSearch = () => {
    router.push(`/offers?${buildQueryParams()}`)
  }

  const resetFilters = () => {
    setSelectedType([])
    setSelectedBedrooms([])
    setLocationInput('')
    setSelectedTypeOption(null)
    setSelectedBedroomsOption(null)
    setSelectedSort('')
    router.push('/offers')
  }

  const sortOptions = mapSortEnumToOptions()

  return (
    <section className="offers">
      <div className="offers__container">
        <h1 className="offers__title">Search for an offer</h1>
        <div className="offers__filters">
          <Input
            icon
            placeholder="Search of location"
            value={locationInput}
            onChange={(e: any) => setLocationInput(e.target.value)}
            onBlur={() => {}}
            className="input-offers"
          />
          <Select
            options={mapDocsToOptions(filterData?.productType.docs)}
            label="Property type"
            value={selectedTypeOption}
            onChange={(val: IOption) => {
              setSelectedTypeOption(val)
              setSelectedType([val.id])
            }}
            className="offers--select"
          />
          <Select
            options={mapDocsToOptions(filterData?.bedrooms.docs)}
            label="Bedrooms"
            value={selectedBedroomsOption}
            onChange={(val: IOption) => {
              setSelectedBedroomsOption(val)
              setSelectedBedrooms([val.id])
            }}
            className="offers--select"
          />
          <Button typeBtn={'btn'} titlebtn="Search" icon={<SearchSvg />} onClick={handleSearch} />
          <Button
            typeBtn={'outline'}
            titlebtn="Reset"
            onClick={resetFilters}
            className="btn-offers-reset"
          />
        </div>
      </div>
      <div className="offers__line"></div>
      <div className="offers__container">
        <div className="offers__sorting">
          <div className="offers__counter">
            {data.length} <span>results found</span>
          </div>
          <Select
            options={sortOptions}
            label="Sort by"
            className="offers--select"
            value={sortOptions.find((opt) => opt.id === selectedSort) || null}
            onChange={handleSortChange}
          />
        </div>
        <div className="offers__products products">
          <div className="products__wrapper">
            {data && data.map((product, index) => <ProductCard key={index} product={product} />)}
          </div>
        </div>
        {data.length > MOCK_LIMIT_PRODUCT && <Button typeBtn={'outline'} titlebtn="Show more" />}
      </div>
    </section>
  )
}

export default OffersBlock
