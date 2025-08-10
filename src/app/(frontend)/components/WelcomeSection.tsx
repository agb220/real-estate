'use client'
import { useState } from 'react'
import Image from 'next/image'
import Input from './shared/Input'
import Select from './shared/Select'
import Button from './shared/Button'
import { getImageUrl } from '@/utilities/getUrl'
import { IHeroSection, Product } from '@/payload-types'
import { SearchSvg } from './icons'
import ProductSearchModal from './modals/ProductSearchModal'

interface WelcomeSectionProps {
  data: IHeroSection
  productTypes: {
    id: string
    name: string
  }[]
  products: Product[]
}

const WelcomeSection = ({ ...props }: WelcomeSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__wrapper">
          <div className="hero__content content-block">
            <h1 className="content-block__title">{props.data.title}</h1>
            <p className="content-block__description">{props.data.description}</p>
            <form action="" className="form-search">
              <div className="form-search__row">
                <Input placeholder="Search of location" icon className="input-form-search" />
                <Select
                  options={props.productTypes}
                  className="select--hero"
                  label="Property type"
                />
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
      {modalOpen && (
        <ProductSearchModal
          isOpen={modalOpen}
          setIsOpenModal={setModalOpen}
          findResult={props.products}
        />
      )}
    </section>
  )
}

export default WelcomeSection
