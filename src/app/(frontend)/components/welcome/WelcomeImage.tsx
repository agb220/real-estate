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
          size: 'pngBig',
        })}
        alt={title}
        className="img-block__main"
        priority
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
    </div>
  )
}
