import { getPayload } from 'payload'
import config from '@payload-config'
import { notFound } from 'next/navigation'
import LayoutWrapper from '../../components/layout/LayoutWrapper'
import SubscribeSection from '../../components/SubscribeSection'
import { Product } from '@/payload-types'
import ProductBlock from '../../components/ProductBlock/ProductBlock'
import RelatedProductsSection from '../../components/RelatedProductsSection'
import { BackSvg } from '../../components/icons'

export default async function OfferBySlugPage({ params }: any) {
  const { slug } = await params

  if (!slug) {
    return notFound()
  }
  const payload = await getPayload({ config })
  const product = await payload.find({
    collection: 'products',
    pagination: false,
    depth: 3,
    limit: 6,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  if (!product || !product.docs.length) {
    return notFound()
  }

  const productData = product.docs[0]
  const productObj = productData as Product

  return (
    <LayoutWrapper>
      <main>
        <div className="bread-crumbs">
          <div className="bread-crumbs__container">
            <div className="bread-crumbs__wrapper">
              <a href="/offers" className="bread-crumbs__link">
                <BackSvg /> Back
              </a>
            </div>
          </div>
        </div>
        {productObj && <ProductBlock {...productObj} />}
        {Array.isArray(productObj.productDetails.relatedProducts) && (
          <RelatedProductsSection
            products={productObj.productDetails.relatedProducts.filter(
              (p): p is Product => typeof p !== 'string',
            )}
          />
        )}
        <SubscribeSection />
      </main>
    </LayoutWrapper>
  )
}
