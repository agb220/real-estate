'use client'
import { useState } from 'react'
import ContactUsModal from '../modals/ContactUsModal'

interface SidebarProps {
  isClosing: boolean
  onClose: () => void
  openContactUsModal: () => void
}

const Sidebar = ({ isClosing, onClose, openContactUsModal }: SidebarProps) => {
  return (
    <div
      className={`sidebar ${isClosing ? 'sidebar--closing' : 'sidebar--open'}`}
      onClick={onClose}
    >
      <div className="sidebar__body" onClick={(e) => e.stopPropagation()}>
        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <a href="#top-offers" onClick={onClose} className="sidebar__link">
                Top offers
              </a>
            </li>
            <li className="sidebar__item">
              <a href="/offers" className="sidebar__link" onClick={onClose}>
                Search in offers
              </a>
            </li>
            <li className="sidebar__item">
              <a href="#testimonials" className="sidebar__link" onClick={onClose}>
                Testimonials
              </a>
            </li>
            <li className="sidebar__item">
              <a href="#about-us" className="sidebar_link" onClick={onClose}>
                About us
              </a>
            </li>
            <li className="sidebar__item">
              <button className="sidebar__link" onClick={openContactUsModal}>
                Contact us
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar
