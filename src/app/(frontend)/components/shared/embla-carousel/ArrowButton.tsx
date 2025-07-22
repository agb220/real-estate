import React, { useCallback, useEffect, useState } from 'react'
import Button from '../Button'
import { ArrowSvg } from '../../icons'

export const usePrevNextButtons = (emblaApi: any) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev())
    setNextBtnDisabled(!emblaApi.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('scroll', onSelect).on('slideFocus', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

export const PrevButton = (props: any) => {
  return (
    <Button
      type="icon"
      className="embla__arrow-left"
      icon={<ArrowSvg />}
      onClick={props.onClick}
      disabled={props.disabled}
    />
  )
}

export const NextButton = (props: any) => {
  const { children, ...restProps } = props

  return (
    <Button
      type="icon"
      icon={<ArrowSvg />}
      className="embla__arrow-right"
      onClick={props.onClick}
      disabled={props.disabled}
    />
  )
}
