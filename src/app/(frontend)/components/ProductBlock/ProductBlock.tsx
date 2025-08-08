import Image from 'next/image'
import { RichText } from '@payloadcms/richtext-lexical/react'
import ImagesSlider from '../ImagesSlider'
import Button from '../shared/Button'
import LocationMap from '../LocationMap'
import ContactUsForm from '../forms/ContactUsForm'
import { Product } from '@/payload-types'
import { FaltSvg, LocationGreenSvg, MetersSvg, PhoneSvg } from '../icons'

const ProductBlock = (props: Product) => {
  return (
    <section className="product">
      <div className="product__container">
        <h1 className="product__title">{props.title}</h1>
        <div className="product__wrapper">
          <div className="product__about">
            <ImagesSlider images={props.main.images} productName={props.title} />
            <div className="product__info">
              <div className="product__short-info short-info">
                <ul className="short-info__items">
                  <li className="short-info__item">
                    <span className="short-info__icon">
                      <FaltSvg />
                    </span>
                    <span className="short-info__title">
                      {props.main.type &&
                        typeof props.main.type !== 'string' &&
                        props.main.type.name}
                    </span>
                  </li>
                  <li className="short-info__item">
                    <span className="short-info__icon">
                      <MetersSvg />
                    </span>
                    <span className="short-info__title">
                      {props.productDetails.totalArea && props.productDetails.totalArea} m²
                    </span>
                  </li>
                  <li className="short-info__item">
                    <span className="short-info__icon">
                      <LocationGreenSvg />
                    </span>
                    <span className="short-info__title">
                      {props.main.location &&
                        typeof props.main.location !== 'string' &&
                        props.main.location.name}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="product__mortgage mortgage-form">
                <div className="mortgage-form__wrapper">
                  <div className="mortgage-form__deteils">
                    <span className="mortgage-form__title">Mortgage since:</span>
                    <span className="mortgage-form__price">
                      {props.productDetails.prices.Payment}/ month
                    </span>
                  </div>
                  <Button typeBtn={'btn'} titlebtn="Get a mortage" className="btn-product-block" />
                </div>
              </div>
              <RichText data={props.productDetails.description} className="product__content" />
              {props.productDetails.mapLink && (
                <div className="product__location">
                  <LocationMap mapUrl={props.productDetails.mapLink} />
                </div>
              )}
            </div>
          </div>
          <div className="product__aside aside">
            <div className="aside__wrapper ">
              <div className="form">
                <h3 className="form__title">Contact us</h3>
                <div className="form__menadger menadger">
                  <div className="menadger__photo">
                    <Image
                      src={'/images/menager/menager.png'}
                      alt="Menager: Haylie Donin"
                      width={52}
                      height={50}
                      className="menadger__img"
                    />
                  </div>
                  <div className="menadger__info">
                    <div className="menadger__name">Haylie Donin</div>
                    <a href="tel:+34555781731" className="menadger__phone">
                      <PhoneSvg />
                      <span> +34 555 781 731</span>
                    </a>
                  </div>
                </div>
                <ContactUsForm />
              </div>
              <div className="brief">
                <h3 className="brief__title">Brief characteristics</h3>
                <ul className="brief__items">
                  <li className="brief__item item">
                    <span className="item__title">City: </span>
                    <span className="item__characteristic">
                      {props.main.type &&
                        typeof props.main.type !== 'string' &&
                        props.main.type.name}{' '}
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Street: </span>
                    <span className="item__characteristic">
                      {props.productDetails.address && props.productDetails.address}
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Garages:</span>
                    <span className="item__characteristic">
                      {props.productDetails.garages && props.productDetails.garages} cars
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Type:</span>
                    <span className="item__characteristic">
                      {props.main.type &&
                        typeof props.main.type !== 'string' &&
                        props.main.type.name}{' '}
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Number of rooms:</span>
                    <span className="item__characteristic">
                      {props.productDetails.roomNumbers && props.productDetails.roomNumbers}
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Usable area:</span>
                    <span className="item__characteristic">
                      {props.productDetails.usableArea && props.productDetails.usableArea} m2
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Total area:</span>
                    <span className="item__characteristic">
                      {props.productDetails.totalArea && props.productDetails.totalArea} m2
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Insulated object:</span>
                    <span className="item__characteristic">
                      {props.productDetails.insulatedObject && props.productDetails.insulatedObject
                        ? 'Yes'
                        : 'No'}
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Balcony:</span>
                    <span className="item__characteristic">
                      {props.productDetails.balcony && props.productDetails.balcony ? 'Yes' : 'No'}
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Terrace:</span>
                    <span className="item__characteristic">
                      {props.productDetails.terrace && props.productDetails.terrace ? 'Yes' : 'No'}
                    </span>
                  </li>

                  <li className="brief__item item">
                    <span className="item__title">Number of bathrooms:</span>
                    <span className="item__characteristic">
                      {props.productDetails.numberOfBathrooms &&
                        props.productDetails.numberOfBathrooms}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductBlock
