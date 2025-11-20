'use client'
import { useState, useEffect, useMemo, useRef, lazy, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'qs'
import Input from '../shared/Input'
import Select, { IOption } from '../shared/Select'
import Button from '../shared/Button'

import { SearchSvg } from '../icons'
import { useSearch } from '../../_context/SearchContext'
import Link from 'next/link'

const ProductSearchModal = lazy(() => import('../modals/ProductSearchModal'))

interface WelcomeContentProps {
  data: any
  // productTypes?: { id: string; name: string }[]
}

export default function WelcomeContent({ data }: WelcomeContentProps) {
  // const [modalOpen, setModalOpen] = useState(false)
  // const [searchTriggered, setSearchTriggered] = useState(false)
  // const [isSearching, setIsSearching] = useState(false)

  // const router = useRouter()
  // const searchParams = useSearchParams()
  // const prevSigRef = useRef<string>('')

  // const getDocsSignature = (docs?: any[]) => {
  //   if (!docs || !docs.length) return 'empty'

  //   const ids = docs.map((d: any) => d?.id ?? d?._id ?? '').join('|')
  //   return `${docs.length}:${ids.slice(0, 200)}`
  // }

  // const currentParams = useMemo(() => {
  //   return qs.parse(searchParams.toString(), {
  //     arrayFormat: 'comma',
  //     parseNumbers: true,
  //   })
  // }, [searchParams])

  // const {
  //   products,
  //   filterData,
  //   locationInput,
  //   setLocationInput,
  //   selectedTypeOption,
  //   setSelectedTypeOption,
  // } = useSearch()

  // useEffect(() => {
  //   prevSigRef.current = getDocsSignature(products?.docs)
  // }, [])

  // const handleSearch = async () => {
  //   setIsSearching(true)

  //   const currentParams = qs.parse(window.location.search, { ignoreQueryPrefix: true })
  //   const locationDoc = filterData?.locations?.docs.find(
  //     (doc) => doc.name.toLowerCase() === locationInput.toLowerCase(),
  //   )
  //   const locationId = locationDoc ? locationDoc.id : undefined

  //   const updatedParams = {
  //     ...currentParams,
  //     locations: locationId ? [locationId] : locationInput.trim() === '' ? [] : [locationInput],
  //     productType: selectedTypeOption,
  //     bedrooms: [],
  //   }

  //   const queryString = qs.stringify(updatedParams, {
  //     skipEmptyString: true,
  //     skipNull: true,
  //     arrayFormat: 'comma',
  //   })

  //   router.push(`${window.location.pathname}${queryString ? `?${queryString}` : ''}`, {
  //     scroll: false,
  //   })

  //   setSearchTriggered(true)
  // }

  // useEffect(() => {
  //   // sync params with state
  //   if (!currentParams) return
  //   if (currentParams.productType !== selectedTypeOption[0])
  //     setSelectedTypeOption([currentParams.productType]?.filter(Boolean) || [])
  //   if (Array.isArray(currentParams.locations) && currentParams.locations.length)
  //     setLocationInput(currentParams.locations[0])
  // }, [currentParams])

  // useEffect(() => {
  //   const currentSig = getDocsSignature(products?.docs)
  //   if (searchTriggered && currentSig !== prevSigRef.current) {
  //     setModalOpen(true)
  //     setSearchTriggered(false)
  //     setIsSearching(false)
  //   }
  //   prevSigRef.current = currentSig
  // }, [products, searchTriggered])

  // const mapDocsToOptions = (arr?: { id: string; name: string }[]): IOption[] =>
  //   arr?.map((val) => ({ id: val.id, name: val.name })) || []
  // const isButtonDisabled = isSearching || (!locationInput?.trim() && !selectedTypeOption?.[0])

  // const closeModal = () => {
  //   setModalOpen(false)
  //   router.push('/', { scroll: false })
  // }

  return (
    <>
      <div className="hero__content content-block">
        <h1 className="content-block__title">{data.title}</h1>
        <p className="content-block__description">{data.description}</p>
        <Link href={'/offers'} className="button button--outline">
          Go To Catalog
        </Link>

        {/* <form
          className="form-search"
          onSubmit={(e) => {
            e.preventDefault()
            handleSearch()
          }}
        >
          <div className="form-search__row">
            <Input
              placeholder="Search of location"
              icon
              value={locationInput}
              onChange={(e: { target: { value: string } }) => setLocationInput(e.target.value)}
            />
            <Select
              options={productTypes ? productTypes : []}
              className="select--hero"
              label="Property type"
              value={
                mapDocsToOptions(filterData?.productType?.docs).find(
                  (opt) => opt.id === selectedTypeOption?.[0],
                ) || null
              }
              onChange={(val) => setSelectedTypeOption([val.id])}
            />
          </div>
          <Button
            titlebtn={isSearching ? 'Searching...' : 'Search'}
            typeBtn="btn"
            icon={!isSearching ? <SearchSvg /> : <></>}
            className="btn--hero"
            type="submit"
            disabled={isButtonDisabled}
          />
        </form> */}
      </div>

      {/* {modalOpen && (
        <Suspense fallback={null}>
          <ProductSearchModal
            isOpen={modalOpen}
            setIsOpenModal={closeModal}
            findResult={products?.docs ?? []}
          />
        </Suspense>
      )} */}
    </>
  )
}
