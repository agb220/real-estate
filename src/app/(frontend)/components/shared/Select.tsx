'use client'
import { useState, useRef, useEffect } from 'react'
import { ChevronSvg } from '../icons'

export type IOption = {
  id: string
  name: string
}

interface CustomSelectProps {
  options: IOption[]
  defaultValue?: IOption
  value?: IOption | null
  onChange?: (option: IOption) => void
  className?: string
  label?: string
}

const Select = ({
  options,
  defaultValue,
  onChange,
  className,
  label,
  value,
}: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<IOption | null>(defaultValue || null)
  const selectRef = useRef<HTMLDivElement>(null)

  const selectedOption = value !== undefined ? value : selected

  const handleSelect = (option: IOption) => {
    if (value === undefined) {
      setSelected(option)
    }
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
        <span className={!selectedOption ? 'placeholder' : ''}>
          {selectedOption ? selectedOption.name : label}
        </span>
        <ChevronSvg className="chevron-icon" />
      </div>
      {isOpen && (
        <ul className="select__options">
          {options.map((option, index) => (
            <li
              key={index}
              className={`select__option ${option.name === selectedOption?.name ? 'selected' : ''}`}
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
