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
    case 'all':
      return 'All'
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

  const locations = filterData?.locations?.docs || []

  const handleSearch = () => {
    const query = new URLSearchParams()

    const matchedLocation = locations.find(
      (loc) => loc?.name?.toLowerCase().trim() === locationInput?.toLowerCase().trim(),
    )

    if (locationInput.trim()) {
      query.append('locations', matchedLocation?.id ?? locationInput.trim().toLowerCase())
    }

    if (selectedType.length) {
      query.append('productType', selectedType.join(','))
    }

    if (selectedBedrooms.length) {
      query.append('bedrooms', selectedBedrooms.join(','))
    }

    router.push(`/offers?${query.toString()}`)
  }

  const resetFilters = () => {
    setSelectedType([])
    setSelectedBedrooms([])
    setLocationInput('')
    setSelectedTypeOption(null)
    setSelectedBedroomsOption(null)
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
          />
          <Select
            options={mapDocsToOptions(filterData?.productType.docs)}
            label="Property type"
            value={selectedTypeOption}
            onChange={(val: IOption) => {
              setSelectedTypeOption(val)
              setSelectedType([val.id])
            }}
          />
          <Select
            options={mapDocsToOptions(filterData?.bedrooms.docs)}
            label="Bedrooms"
            value={selectedBedroomsOption}
            onChange={(val: IOption) => {
              setSelectedBedroomsOption(val)
              setSelectedBedrooms([val.id])
            }}
          />
          {/* <Select
            options={mapDocsToOptions(filterData?.price.docs)}
            label="Select price"
            onChange={(val: IOption) => setSelectedPrice([val.id])}
          /> */}
          <Button typeBtn={'btn'} titlebtn="Search" icon={<SearchSvg />} onClick={handleSearch} />
          <Button typeBtn={'outline'} titlebtn="Reset" onClick={resetFilters} />
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
            onChange={(val: IOption) => setSelectedType([val.id])}
          />
        </div>
        <div className="offers__products products">
          <div className="products__wrapper">
            {data && data.map((product, index) => <ProductCard key={index} product={product} />)}
          </div>
        </div>
        <Button typeBtn={'outline'} titlebtn="Show more" />
      </div>
    </section>
  )
}

export default OffersBlock
