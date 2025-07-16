'use client'
import { useState } from 'react'
import Image from 'next/image'
import Sidebar from './Sidebar'

import '../../../../../css/style.css'

const Header = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [isMenuActive, setIsMenuActive] = useState(false)

  const handleClose = () => {
    setIsClosing(true)
    setIsMenuActive(false)

    setTimeout(() => {
      setModalOpen(false)
      setIsClosing(false)
    }, 300)
  }

  const handleOpen = () => {
    setModalOpen(true)
    setIsMenuActive(true)
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
                  <a href="#contact-us" className="menu__link">
                    Contact us
                  </a>
                </li>
              </ul>
            </nav>

            <button
              className={`icon-menu ${isMenuActive ? 'icon-menu--active' : ''}`}
              type="button"
              onClick={() => {
                if (modalOpen) {
                  handleClose()
                } else {
                  handleOpen()
                }
              }}
            >
              <span></span>
            </button>
          </div>
        </div>
      </div>

      {modalOpen && <Sidebar isClosing={isClosing} onClose={handleClose} />}
    </header>
  )
}

export default Header
