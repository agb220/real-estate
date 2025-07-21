import { ReactNode } from 'react'

interface ButtonProp {
  icon?: ReactNode
  titlebtn: string
  type: 'btn' | 'outline'
  className?: string
}

const Button = ({ icon, titlebtn, type, className }: ButtonProp) => {
  return (
    <button type="submit" className={`button button--${type} ${className}`}>
      {icon && <span className="button__icon">{icon}</span>}
      {titlebtn}
    </button>
  )
}

export default Button
