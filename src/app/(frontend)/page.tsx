import React, { Suspense } from 'react'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload.config'
import LayoutWrapper from './components/layout/LayoutWrapper'
import WelcomeSection from './components/WelcomeSection'
import TopOffersSection from './components/TopOffersSection'
import ReviewsSection from './components/ReviewsSection'
import AboutUsSection from './components/AboutUsSection'
import SubscribeSection from './components/SubscribeSection'
import { FilterDataResponse } from '../(payload)/_collections/product/Product'
import {
  ProductCatalogSearchParams,
  SearchProductsPageProps,
  ShopPageSearchParams,
} from '@/utilities/types'
import { SearchProvider } from './_context/SearchContext'

// const convertSearchParams = (params?: ShopPageSearchParams): ProductCatalogSearchParams => {
//   return {
//     sort: params?.sort || undefined,
//     productType: params?.productType ? params.productType.split(',') : [],
//     bedrooms: params?.bedrooms ? params.bedrooms.split(',') : [],
//     locations: params?.locations ? params.locations.split(',') : [],
//   }
// }

export default async function HomePage(props: SearchProductsPageProps) {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const findResult = await payload.findGlobal({
    slug: 'main-page',
    depth: 2,
  })

  // const productTypes = await payload.find({
  //   collection: 'property-types',
  //   pagination: true,
  //   depth: 1,
  //   limit: 100,
  //   select: { name: true },
  // })

  // const filterFetch = await fetch(
  //   `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/filter-data`,
  //   {
  //     cache: 'force-cache',
  //   },
  // )

  // const filterData: FilterDataResponse = await filterFetch.json()

  // const searchObj = convertSearchParams(await props.searchParams)

  // let whereState = {}

  // if (searchObj.locations.length) {
  //   whereState = {
  //     ...whereState,
  //     'main.location': {
  //       in: searchObj.locations,
  //     },
  //   }
  // }

  // if (searchObj.productType.length) {
  //   whereState = {
  //     ...whereState,
  //     'main.type': {
  //       in: searchObj.productType,
  //     },
  //   }
  // }

  // const findProducts = await payload.find({
  //   collection: 'products',
  //   pagination: true,
  //   depth: 1,
  //   limit: 6,
  //   page: 1,
  //   where: whereState,
  // })

  if (!findResult) {
    return notFound()
  }

  return (
    <LayoutWrapper>
      <main>
        {/* <Suspense fallback={null}>
          <SearchProvider
            products={findProducts}
            filterData={filterData}
            selectedSearchParams={searchObj}
          > */}
        {(findResult.section || []).map((section, idx) => {
          if (section.blockType === 'hero-section') {
            return (
              <WelcomeSection
                key={idx}
                data={section}
                // productTypes={productTypes.docs}
              />
            )
          }
        })}
        {/* </SearchProvider>
        </Suspense> */}
        {(findResult.section || []).map((section, idx) => {
          if (section.blockType === 'top-offers') {
            return <TopOffersSection key={idx} data={section} />
          }
        })}
        {(findResult.section || []).map((section, idx) => {
          if (section.blockType === 'reviews') {
            return <ReviewsSection key={idx} data={section} />
          }
        })}
        {(findResult.section || []).map((section, idx) => {
          if (section.blockType === 'about-us') {
            return <AboutUsSection key={idx} data={section} />
          }
        })}

        <SubscribeSection />
      </main>
    </LayoutWrapper>
  )
}
