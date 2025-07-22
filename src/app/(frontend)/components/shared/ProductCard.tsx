import { Product } from '@/payload-types'
import { getImageUrl } from '@/utilities/getUrl'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="product">
      <div className="product__wrapper">
        <a href={product.slug} className="product__link">
          <Image
            src={getImageUrl({
              media: product.main.mainImage,
              size: 'large',
            })}
            alt={product.title}
            width={384}
            height={269}
            className="product__img"
          />
        </a>
        <div className="product__content">
          <h3 className="product__name">
            <a href={product.slug}>{product.title}</a>
          </h3>
          <p className="product__price">{product.productDetails.prices.Payment}</p>
          <p className="product__location">
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
