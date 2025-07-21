'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronSvg } from '../icons'

type Option = {
  id: string | number
  name: string
}

interface CustomSelectProps {
  options: Option[]
  defaultValue?: Option
  onChange?: (option: Option) => void
  className?: string
}

const Select = ({ options, defaultValue, onChange, className }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(defaultValue || options[0])
  const selectRef = useRef<HTMLDivElement>(null)

  const handleSelect = (option: any) => {
    setSelected(option)
    onChange?.(option)
    setIsOpen(false)
  }

  // close select, if click outside

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className={`input-wrapper select ${isOpen ? 'open' : ''} ${className}`} ref={selectRef}>
      <div className="select__header" onClick={() => setIsOpen((prev) => !prev)}>
        <span>{selected.name}</span>
        <ChevronSvg className="chevron-icon" />
      </div>
      {isOpen && (
        <ul className="select__options">
          {options.map((option, index) => (
            <li
              key={index}
              className={`select__option ${option.name === selected.name ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Select
