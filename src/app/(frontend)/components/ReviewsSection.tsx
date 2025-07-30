'use client'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import { IReviewsBlock, Review } from '@/payload-types'
import Title from './shared/Title'
import { NextButton, PrevButton, usePrevNextButtons } from './shared/embla-carousel/ArrowButton'
import { DotButton, useDotButton } from './shared/embla-carousel/EmblaDot'
import { BracesSvg } from './icons'
import { getImageUrl } from '@/utilities/getUrl'

interface ReviewsSectionProps {
  data: IReviewsBlock
}

const ReviewsSection = ({ ...data }: ReviewsSectionProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    slidesToScroll: 'auto',
    align: 'start',
    containScroll: 'trimSnaps',
  })
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi)

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi)

  return (
    <section className="reviews" id="testimonials">
      <div className="reviews__wrapper">
        <div className="reviews__container">
          <div className="reviews__title-block">
            <Title title={data.data.title} description={data.data.description} />
            <div className="reviews__arrow-block">
              <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
              <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
            </div>
          </div>
        </div>
        <div className="reviews__items reviews-list" ref={emblaRef}>
          <div className="reviews-list__wrapper">
            {data.data.reviews &&
              data.data.reviews
                .filter((review): review is Review => typeof review !== 'string')
                .map((review, index) => <ReviewCard key={index} {...review} />)}
          </div>
        </div>

        <div className="reviews__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'dot '.concat(index === selectedIndex ? 'dot--active' : '')}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

const ReviewCard = ({ ...props }: Review) => {
  return (
    <article className="review-card">
      <BracesSvg className="review-card__decor" />
      <div className="review-card__wrapper">
        <div className="review-card__content">{props.reviewMessage}</div>
        <div className="review-card__info">
          {props.mainImage && props.mainImage ? (
            <Image
              src={getImageUrl({
                media: props.mainImage,
                size: 'card',
              })}
              alt={props.reviewerName}
              width={64}
              height={64}
              className="review-card__photo"
            />
          ) : (
            <div className="review-card__photo default--photo"></div>
          )}

          <div className="review-card__reviewer">
            <div className="review-card__name">{props.reviewerName}</div>
            <div className="review-card__product-name">
              {props.reviewProduct &&
                typeof props.reviewProduct !== 'string' &&
                props.reviewProduct.title}
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default ReviewsSection
