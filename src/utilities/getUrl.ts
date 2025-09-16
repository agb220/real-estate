import { Media } from '@/payload-types'
import { StaticImageData } from 'next/image'

export const getImageUrl = (params: {
  media: string | Media | { url: string } | null | undefined
  defaultImage?: StaticImageData
  size?: 'thumbnail' | 'card' | 'slider' | 'big' | 'large' | 'pngCard' | 'pngSlider' | 'pngBig'
}) => {
  if (!params.media) {
    return params.defaultImage?.src || ''
  }

  if (typeof params.media === 'string') {
    return params.media.startsWith('/media') ? params.media : params.defaultImage?.src || ''
  }

  const media = params.media as Media
  const mediaUrl = (params.size && media.sizes?.[params.size]?.url) || media.url

  if (!mediaUrl) {
    return params.defaultImage?.src || ''
  }

  return mediaUrl.startsWith('http') ? mediaUrl : `${process.env.NEXT_PUBLIC_SERVER_URL}${mediaUrl}`
}
