import Image from 'next/image'
import { getImageUrl } from '@/utilities/getUrl'

interface WelcomeImageProps {
  mainImage: any
  title: string
}

export default async function WelcomeImage({ mainImage, title }: WelcomeImageProps) {
  return (
    <div className="imgs-block__wrapper img-block">
      <Image
        src={getImageUrl({
          media: mainImage,
          size: 'pngCard',
        })}
        alt={title}
        className="img-block__main"
        loading="lazy"
        width={490}
        height={490}
        style={{ objectFit: 'cover' }}
        placeholder="empty"
      />
    </div>
  )
}
