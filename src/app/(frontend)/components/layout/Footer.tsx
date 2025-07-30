'use client'
import Image from 'next/image'
import { useState } from 'react'
import ContactUsModal from '../modals/ContactUsModal'

const Footer = () => {
  const [contactUsModalOpen, setContactUsModalOpen] = useState(false)
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <a href="/">
              <Image src="images/logo-white.svg" alt="Real estate" width="201" height="40" />
            </a>
          </div>
          <div className="footer__menu footer-menu">
            <ul className="footer-menu__list">
              <li className="footer-menu__item">
                <a href="#top-offers" className="footer-menu__link">
                  Top offers
                </a>
              </li>
              <li className="footer-menu__item">
                <a href="/offers" className="footer-menu__link">
                  Search in offers
                </a>
              </li>
              <li className="footer-menu__item">
                <a href="#testimonials" className="footer-menu__link">
                  Testimonials
                </a>
              </li>
              <li className="footer-menu__item">
                <a href="#about-us" className="footer-menu__link">
                  About us
                </a>
              </li>
              <li className="footer-menu__item">
                <button className="footer-menu__link" onClick={() => setContactUsModalOpen(true)}>
                  Contact us
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {contactUsModalOpen && (
        <ContactUsModal isOpen={contactUsModalOpen} setIsOpenModal={setContactUsModalOpen} />
      )}
    </footer>
  )
}

export default Footer
