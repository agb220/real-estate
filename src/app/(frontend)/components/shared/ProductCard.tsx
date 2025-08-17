import Image from 'next/image'
import Link from 'next/link'
import { getImageUrl } from '@/utilities/getUrl'
import { Product } from '@/payload-types'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="product-card">
      <div className="product-card__wrapper">
        <Link href={`/offers/${product.slug}`} className="product-card__link">
          <Image
            src={getImageUrl({
              media: product.main.mainImage,
              size: 'large',
            })}
            alt={product.title}
            width={384}
            height={269}
            className="product-card__img"
            draggable={false}
          />
        </Link>
        <div className="product-card__content">
          <h3 className="product-card__name">
            <Link href={`/offers/${product.slug}`}>{product.title}</Link>
          </h3>
          <p className="product-card__price">{product.productDetails.prices.Payment}</p>
          <p className="product-card__location">
            {typeof product.main.location === 'object' && product.main.location !== null
              ? product.main.location.name
              : product.main.location}
          </p>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
