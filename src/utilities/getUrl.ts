import { Media } from '@/payload-types'
import { StaticImageData } from 'next/image'

export const getImageUrl = (params: {
  media: string | Media | { url: string } | null | undefined
  defaultImage?: StaticImageData
  size?: 'thumbnail' | 'card' | 'slider' | 'big' | 'large' | 'pngSlider' | 'pngBig' | 'pngCard'
}) => {
  if (!params.media || typeof params.media === 'string') {
    if (typeof params.media === 'string' && params.media.startsWith('/media')) {
      return params.media
    }
    return params.defaultImage?.src || ''
  }

  const baseUrl = (url: string | null | undefined): string => {
    if (!url) return ''
    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    try {
      new URL(serverUrl)
      return `${serverUrl}${url}`
    } catch (e) {
      console.error('Invalid NEXT_PUBLIC_SERVER_URL:', serverUrl, e)
      return url
    }
  }

  const media = params.media as Media

  if (params.size === 'thumbnail' && media.sizes?.thumbnail?.url) {
    return baseUrl(media.sizes.thumbnail.url)
  }
  if (params.size === 'card' && media.sizes?.card?.url) {
    return baseUrl(media.sizes.card.url)
  }
  if (params.size === 'slider' && media.sizes?.slider?.url) {
    return baseUrl(media.sizes.slider.url)
  }
  if (params.size === 'big' && media.sizes?.big?.url) {
    return baseUrl(media.sizes.big.url)
  }
  if (params.size === 'large' && media.sizes?.large?.url) {
    return baseUrl(media.sizes.large.url)
  }
  if (params.size === 'pngSlider' && media.sizes?.pngSlider?.url) {
    return baseUrl(media.sizes.pngSlider.url)
  }
  if (params.size === 'pngBig' && media.sizes?.pngBig?.url) {
    return baseUrl(media.sizes.pngBig.url)
  }
  if (params.size === 'pngCard' && media.sizes?.pngCard?.url) {
    return baseUrl(media.sizes.pngCard.url)
  }

  return media.url ? baseUrl(media.url) : ''
}
