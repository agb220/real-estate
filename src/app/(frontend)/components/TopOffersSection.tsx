'use client'

import Link from 'next/link'
import useEmblaCarousel from 'embla-carousel-react'
import { ITopOffers, Product } from '@/payload-types'
import { useDotButton } from './shared/embla-carousel/EmblaDot'
import { NextButton, PrevButton, usePrevNextButtons } from './shared/embla-carousel/ArrowButton'
import ProductCard from './shared/ProductCard'
import Title from './shared/Title'

interface TopOffersSectionProps {
  data: ITopOffers
}

const TopOffersSection = ({ ...props }: TopOffersSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 'auto',
    align: 'start',
    containScroll: 'trimSnaps',
  })
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <section className="top-offers" id="top-offers">
      <div className="top-offers__container">
        <div className="top-offers__wrapper">
          <div className="top-offers__block">
            <Title title={props.data.title} description={props.data.description} />
            <div className="top-offers__arrow-block">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
          </div>
          <div className="top-offers__products products" ref={emblaRef}>
            <div className="products__wrapper">
              {props.data.relatedProducts &&
                props.data.relatedProducts
                  .filter((product): product is Product => typeof product !== 'string')
                  .map((product, index) => <ProductCard key={index} product={product} />)}
            </div>
          </div>
          <Link href={'/offers'} className="button button--outline button--top-offers">
            Show all offers
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopOffersSection
