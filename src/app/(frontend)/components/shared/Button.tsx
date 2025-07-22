import { ReactNode } from 'react'

interface ButtonProp {
  icon?: ReactNode
  titlebtn?: string
  type: 'btn' | 'outline' | 'icon'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ icon, titlebtn, type, className, onClick, disabled }: ButtonProp) => {
  return (
    <button
      type="button"
      className={`button button--${type} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}
      {titlebtn && titlebtn}
    </button>
  )
}

export default Button
