'use client'
import useEmblaCarousel from 'embla-carousel-react'
import ProductCard from './shared/ProductCard'
import { Product } from '@/payload-types'

interface RelatedProductsSectionProps {
  products: Product[]
}

const RelatedProductsSection = ({ products }: RelatedProductsSectionProps) => {
  const [emblaRef] = useEmblaCarousel({ align: 'start', dragFree: true })

  return (
    <section className="related-products">
      <div className="related-products__container">
        <div className="related-products__wrapper">
          <h2 className="related-products__title">You might be interested in</h2>
          <div className="related-products__viewport" ref={emblaRef}>
            <div className="related-products__items">
              {products.map((product, index) => (
                <ProductCard product={product} key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RelatedProductsSection
