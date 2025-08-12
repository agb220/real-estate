import { getPayload } from 'payload'
import config from '@payload-config'
import LayoutWrapper from '../components/layout/LayoutWrapper'
import SubscribeSection from '../components/SubscribeSection'
import OffersBlock from '../components/offersComponents/OffersBlock'
import {
  ProductCatalogSearchParams,
  SearchProductsPageProps,
  ShopPageSearchParams,
} from '@/utilities/types'
import { FilterDataResponse } from '@/app/(payload)/_collections/product/Product'
import { MOCK_LIMIT_PRODUCT, SearchProvider } from '../_context/SearchContext'

export const dynamic = 'force-dynamic'

const convertSearchParams = (params?: ShopPageSearchParams): ProductCatalogSearchParams => {
  return {
    sort: params?.sort || undefined,
    productType: params?.productType ? params.productType.split(',') : [],
    bedrooms: params?.bedrooms ? params.bedrooms.split(',') : [],
    locations: params?.locations ? params.locations.split(',') : [],
  }
}

export default async function OffersPage(props: SearchProductsPageProps) {
  const payload = await getPayload({ config })

  const filterFetch = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/filter-data`)
  const filterData: FilterDataResponse = await filterFetch.json()

  const searchObj = convertSearchParams(await props.searchParams)

  const sortParams: string[] = []

  if (searchObj.sort === 'price_high') {
    sortParams.push('-productDetails.prices.fullPrice')
  }

  if (searchObj.sort === 'price_low') {
    sortParams.push('productDetails.prices.fullPrice')
  }

  let whereState = {}

  if (searchObj.bedrooms.length) {
    whereState = {
      ...whereState,
      'productDetails.roomNumbers': {
        in: searchObj.bedrooms,
      },
    }
  }

  if (searchObj.locations.length) {
    whereState = {
      ...whereState,
      'main.location': {
        in: searchObj.locations,
      },
    }
  }

  if (searchObj.productType.length) {
    whereState = {
      ...whereState,
      'main.type': {
        in: searchObj.productType,
      },
    }
  }

  const findResult = await payload.find({
    collection: 'products',
    limit: MOCK_LIMIT_PRODUCT,
    page: 1,
    sort: sortParams.length > 1 ? sortParams : sortParams[0] || undefined,
    where: whereState,
  })

  return (
    <LayoutWrapper>
      <main>
        <SearchProvider
          products={findResult}
          filterData={filterData}
          selectedSearchParams={searchObj}
        >
          <OffersBlock />
          <SubscribeSection />
        </SearchProvider>
      </main>
    </LayoutWrapper>
  )
}
