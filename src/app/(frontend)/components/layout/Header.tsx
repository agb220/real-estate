'use client'
import { useState } from 'react'
import Image from 'next/image'
import Sidebar from './Sidebar'

import '../../../../../css/style.css'
import ContactUsModal from '../modals/ContactUsModal'

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [contactUsModalOpen, setContactUsModalOpen] = useState(false)

  const handleCloseSidebar = () => {
    setIsClosing(true)
    setIsMenuActive(false)

    setTimeout(() => {
      setModalOpen(false)
      setIsClosing(false)
    }, 300)
  }

  const handleOpenSidebar = () => {
    setModalOpen(true)
    setIsMenuActive(true)
  }

  const openContactUsModalFromSidebar = () => {
    setContactUsModalOpen(true)
    handleCloseSidebar()
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__wrapper">
          <a className="header__logo logo" href="/">
            <div className="logo__image">
              <Image src="/images/logo.svg" alt={'Logo'} width={64} height={40} />
            </div>
            <div className="logo__text">
              <Image src="/images/logo-text.svg" alt=" Real estate" width={120} height={40} />
            </div>
          </a>
          <div className="header__menu">
            <nav className="header__navigation menu">
              <ul className="menu__list">
                <li className="menu__item">
                  <a href="#top-offers" className="menu__link">
                    Top offers
                  </a>
                </li>
                <li className="menu__item">
                  <a href="/offers" className="menu__link">
                    Search in offers
                  </a>
                </li>
                <li className="menu__item">
                  <a href="#testimonials" className="menu__link">
                    Testimonials
                  </a>
                </li>
                <li className="menu__item">
                  <a href="#about-us" className="menu__link">
                    About us
                  </a>
                </li>
                <li className="menu__item">
                  <button className="menu__link" onClick={() => setContactUsModalOpen(true)}>
                    Contact us
                  </button>
                </li>
              </ul>
            </nav>

            <button
              className={`icon-menu ${isMenuActive ? 'icon-menu--active' : ''}`}
              type="button"
              onClick={() => {
                if (modalOpen) {
                  handleCloseSidebar()
                } else {
                  handleOpenSidebar()
                }
              }}
            >
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {modalOpen && (
        <Sidebar
          isClosing={isClosing}
          onClose={handleCloseSidebar}
          openContactUsModal={openContactUsModalFromSidebar}
        />
      )}
      {contactUsModalOpen && (
        <ContactUsModal isOpen={contactUsModalOpen} setIsOpenModal={setContactUsModalOpen} />
      )}
    </header>
  )
}

export default Header
