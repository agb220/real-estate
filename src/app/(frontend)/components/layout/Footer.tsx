'use client'
import Image from 'next/image'
import { useState } from 'react'
import ContactUsModal from '../modals/ContactUsModal'
import { useScrollToSection } from '@/utilities/scrollTo'
import Link from 'next/link'

const Footer = () => {
  const [contactUsModalOpen, setContactUsModalOpen] = useState(false)
  const scrollToSection = useScrollToSection()

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__wrapper">
          <div className="footer__logo">
            <Link href="/">
              <Image src="/images/logo-white.svg" alt="Real estate" width="201" height="40" />
            </Link>
          </div>
          <div className="footer__menu footer-menu">
            <ul className="footer-menu__list">
              <li className="footer-menu__item">
                <button className="footer-menu__link" onClick={() => scrollToSection('top-offers')}>
                  Top offers
                </button>
              </li>
              <li className="footer-menu__item">
                <Link href="/offers" className="footer-menu__link">
                  Search in offers
                </Link>
              </li>
              <li className="footer-menu__item">
                <button
                  className="footer-menu__link"
                  onClick={() => scrollToSection('testimonials')}
                >
                  Testimonials
                </button>
              </li>
              <li className="footer-menu__item">
                <button className="footer-menu__link" onClick={() => scrollToSection('about-us')}>
                  About us
                </button>
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
