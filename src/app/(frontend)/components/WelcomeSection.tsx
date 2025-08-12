'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import qs from 'qs'
import { useRouter, useSearchParams } from 'next/navigation'
import Input from './shared/Input'
import Select, { IOption } from './shared/Select'
import Button from './shared/Button'
import ProductSearchModal from './modals/ProductSearchModal'
import { useSearch } from '../_context/SearchContext'
import { getImageUrl } from '@/utilities/getUrl'
import { IHeroSection } from '@/payload-types'
import { SearchSvg } from './icons'

import { ProductCatalogSearchParams } from '@/utilities/types'
import { QsStringifyOptions } from './offersComponents/OffersBlock'
import { updateStateIfChanged } from '@/utilities/updateStateIfChanged'

interface WelcomeSectionProps {
  data: IHeroSection
  productTypes: {
    id: string
    name: string
  }[]
}

const WelcomeSection = ({ ...props }: WelcomeSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentParams = useMemo(() => {
    return qs.parse(searchParams.toString(), {
      ...({ arrayFormat: 'comma', parseNumbers: true } as any),
    }) as unknown as ProductCatalogSearchParams
  }, [searchParams])

  const {
    products,
    filterData,
    locationInput,
    setLocationInput,
    selectedTypeOption,
    setSelectedTypeOption,
  } = useSearch()

  const handleSearch = async () => {
    const currentParams = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    })

    const locationDoc = filterData?.locations?.docs.find(
      (doc) => doc.name.toLowerCase() === locationInput.toLowerCase(),
    )
    const locationId = locationDoc ? locationDoc.id : undefined

    const updatedParams = {
      ...currentParams,
      locations: locationId ? [locationId] : locationInput.trim() === '' ? [] : [locationInput],
      productType: selectedTypeOption,
      bedrooms: [],
    }

    const queryString = qs.stringify(updatedParams, {
      skipEmptyString: true,
      skipNull: true,
      arrayFormat: 'comma',
    } as QsStringifyOptions)

    router.push(`${window.location.pathname}${queryString ? `?${queryString}` : ''}`, {
      scroll: false,
    })

    setModalOpen(true)
  }

  useEffect(() => {
    if (!currentParams) return

    updateStateIfChanged(currentParams.productType, selectedTypeOption, setSelectedTypeOption)

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

  const mapDocsToOptions = (arr?: { id: string; name: string }[]): IOption[] =>
    arr?.map((val) => ({ id: val.id, name: val.name })) || []

  const closeModal = () => {
    setModalOpen(false)
    router.push(window.location.pathname, { scroll: false })
  }
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__wrapper">
          <div className="hero__content content-block">
            <h1 className="content-block__title">{props.data.title}</h1>
            <p className="content-block__description">{props.data.description}</p>
            <form
              action=""
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
                  className="input-form-search"
                  value={locationInput}
                  onChange={(e: any) => setLocationInput(e.target.value)}
                />
                <Select
                  options={props.productTypes}
                  className="select--hero"
                  label="Property type"
                  value={
                    mapDocsToOptions(filterData?.productType?.docs).find(
                      (opt) => opt.id === selectedTypeOption[0],
                    ) || null
                  }
                  onChange={(val) => setSelectedTypeOption([val.id])}
                />
              </div>
              <Button
                titlebtn={'Search'}
                typeBtn={'btn'}
                icon={<SearchSvg />}
                className="btn--hero"
                type="submit"
              />
            </form>
          </div>
          <div className="hero__imgs imgs-block">
            <div className="imgs-block__wrapper img-block">
              <Image
                src={getImageUrl({
                  media: props.data.mainImage,
                  size: 'large',
                })}
                height={580}
                width={580}
                alt={props.data.title}
                className="img-block__main"
              />
              <Image
                src="/images/hero/hero-bg.svg"
                height={500}
                width={479}
                alt=""
                className="img-block__bg"
              />
            </div>
          </div>
        </div>
      </div>
      {modalOpen && (
        <ProductSearchModal
          isOpen={modalOpen}
          setIsOpenModal={closeModal}
          findResult={products?.docs ?? []}
        />
      )}
    </section>
  )
}

export default WelcomeSection
