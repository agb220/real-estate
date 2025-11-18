'use client'
import { SubscribeSvg } from './icons'
import SubscribeForm from './forms/SubscribeForm'

const SubscribeSection = () => {
  return (
    <section className="subcribe">
      <div className="subcribe__container">
        <div className="subcribe__wrapper">
          <div className="subcribe__image">
            <SubscribeSvg />
          </div>
          <div className="subcribe__form">
            <h2 className="subcribe__title">Subscribe to newsletter</h2>
            <p className="subcribe__description">
              Get the latest news and interesting offers and real estate
            </p>
            <SubscribeForm />
          </div>
        </div>
      </div>
    </section>
  )
}

export default SubscribeSection
