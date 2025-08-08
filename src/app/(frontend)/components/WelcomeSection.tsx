import Image from 'next/image'
import { IHeroSection } from '@/payload-types'
import { getImageUrl } from '@/utilities/getUrl'
import Input from './shared/Input'
import Select from './shared/Select'
import Button from './shared/Button'
import { SearchSvg } from './icons'

interface WelcomeSectionProps {
  data: IHeroSection
  productTypes: {
    id: string
    name: string
  }[]
}

const WelcomeSection = ({ ...props }: WelcomeSectionProps) => {
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__wrapper">
          <div className="hero__content content-block">
            <h1 className="content-block__title">{props.data.title}</h1>
            <p className="content-block__description">{props.data.description}</p>
            <form action="" className="form-search">
              <div className="form-search__row">
                <Input placeholder="Search of location" icon />
                <Select options={props.productTypes} className="select--hero" />
              </div>
              <Button
                titlebtn={'Search'}
                typeBtn={'btn'}
                icon={<SearchSvg />}
                className="btn--hero"
              />
            </form>
          </div>
          <div className="hero__imgs imgs-block">
            <div className="imgs-block__wrapper img-block">
              <Image
                src={getImageUrl({
                  media: props.data.mainImage,
                  size: 'large',
                })}
                height={580}
                width={580}
                alt={props.data.title}
                className="img-block__main"
              />
              <Image
                src="/images/hero/hero-bg.svg"
                height={500}
                width={479}
                alt=""
                className="img-block__bg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WelcomeSection
