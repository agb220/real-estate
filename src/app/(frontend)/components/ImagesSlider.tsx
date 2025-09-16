'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import type { Media } from '@/payload-types'
import { getImageUrl } from '@/utilities/getUrl'
import { NextButton, PrevButton, usePrevNextButtons } from './shared/embla-carousel/ArrowButton'

const ImagesSlider = (props: { images: (string | Media)[]; productName?: string }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({})
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  const onThumbClick = useCallback(
    (index: number) => {
      if (!emblaMainApi || !emblaThumbsApi) return
      emblaMainApi.scrollTo(index)
    },
    [emblaMainApi, emblaThumbsApi],
  )

  const onSelect = useCallback(() => {
    if (!emblaMainApi || !emblaThumbsApi) return
    setSelectedIndex(emblaMainApi.selectedScrollSnap())
    emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
  }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaMainApi) return
    onSelect()

    emblaMainApi.on('select', onSelect).on('reInit', onSelect)
  }, [emblaMainApi, onSelect])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaMainApi)

  return (
    <section className="images-slider">
      <div className="images-slider__main main-image" ref={emblaMainRef}>
        <div className="main-image__wrapper">
          {props?.images &&
            props?.images
              .filter(
                (product): product is Media => typeof product === 'object' && product !== null,
              )
              .map((image, index) => (
                <div key={index} className="main-image__image-block">
                  <Image
                    width={1200}
                    height={1200}
                    src={getImageUrl({
                      media: image,
                      size: 'card',
                    })}
                    className="main-image__image"
                    alt={`${props.productName || ''} ${index}`}
                  />
                </div>
              ))}
        </div>
      </div>
      <div className="images-slider__slider slider-block">
        <PrevButton
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
          typeBtn="icon"
          className=""
        />
        <div className="slider-block__block" ref={emblaThumbsRef}>
          <div className="slider-block__wrapper">
            {props?.images &&
              props?.images
                .filter(
                  (product): product is Media => typeof product === 'object' && product !== null,
                )
                .map((image, index) => (
                  <div
                    key={index}
                    className={`slider-block__image-wrapper ${selectedIndex === index ? 'slider-block__image-wrapper--border' : ''}`}
                    onClick={() => onThumbClick(index)}
                  >
                    <Image
                      width={600}
                      height={600}
                      src={getImageUrl({
                        media: image,
                        size: 'thumbnail',
                      })}
                      alt={`${props.productName || ''}  ${index}`}
                      className="slider-block__image"
                    />
                  </div>
                ))}
          </div>
        </div>
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          typeBtn="icon"
          className=""
          icon
        />
      </div>
    </section>
  )
}

export default ImagesSlider
