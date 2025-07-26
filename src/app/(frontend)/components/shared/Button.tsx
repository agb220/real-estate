import { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
  titlebtn?: string
  typeBtn: 'btn' | 'outline' | 'icon'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({
  icon,
  titlebtn,
  typeBtn,
  className,
  onClick,
  disabled,
  type = 'button',
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`button button--${typeBtn} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}
      {titlebtn && titlebtn}
    </button>
  )
}

export default Button
