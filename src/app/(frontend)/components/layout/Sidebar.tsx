'use client'
import { useEffect } from 'react'
import { useScrollToSection } from '@/utilities/scrollTo'
import Link from 'next/link'

interface SidebarProps {
  isClosing: boolean
  onClose: () => void
  openContactUsModal: () => void
  isOpen: boolean
}

const Sidebar = ({ isClosing, onClose, openContactUsModal, isOpen }: SidebarProps) => {
  const scrollToSection = useScrollToSection()

  const handleClick = (id: string) => {
    onClose()
    scrollToSection(id)
  }

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className={`sidebar ${isClosing ? 'sidebar--closing' : 'sidebar--open'}`}
      onClick={onClose}
    >
      <div className="sidebar__body" onClick={(e) => e.stopPropagation()}>
        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            <li className="sidebar__item">
              <button className="sidebar__link" onClick={() => handleClick('top-offers')}>
                Top offers
              </button>
            </li>
            <li className="sidebar__item">
              <Link href="/offers" className="sidebar__link" onClick={onClose}>
                Search in offers
              </Link>
            </li>
            <li className="sidebar__item">
              <button className="sidebar__link" onClick={() => handleClick('testimonials')}>
                Testimonials
              </button>
            </li>
            <li className="sidebar__item">
              <button className="sidebar_link" onClick={() => handleClick('about-us')}>
                About us
              </button>
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
