import Image from 'next/image'
import { IAboutUs } from '@/payload-types'
import { getImageUrl } from '@/utilities/getUrl'
import RichTextRenderer from '@/utilities/richText'

interface AboutUsSectionProps {
  data: IAboutUs
}

const AboutUsSection = ({ ...data }: AboutUsSectionProps) => {
  return (
    <section className="about-us" id="about-us">
      <div className="about-us__container">
        <div className="about-us__wrapper">
          <div className="about-us__images">
            <div className="about-us__decor">
              <Image
                src="/images/about/dots.png"
                alt={''}
                width={477}
                height={321}
                style={{ objectFit: 'contain' }}
                loading="lazy"
              />
            </div>
            <div className="about-us__image">
              <Image
                src={getImageUrl({
                  media: data.data.mainImage,
                  size: 'card',
                })}
                width={628}
                height={471}
                alt={data.data.title}
                loading="lazy"
              />
            </div>
          </div>
          <div className="about-us__content">
            <h2 className="about-us__title">{data.data.title}</h2>
            {data.data.description && <RichTextRenderer content={data.data.description} />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutUsSection
