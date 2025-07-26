import { InputHTMLAttributes } from 'react'
import { LocationSvg } from '../icons'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: boolean
  error?: string
}

const Input = ({ ...props }: InputProps) => {
  return (
    <div className="input-block">
      <div className="input-wrapper input--icon">
        {props.icon && <LocationSvg />}
        <input type="text" className="input" placeholder={props.placeholder} {...props} />
      </div>
      {props.error && <p className="input-error">{props.error}</p>}
    </div>
  )
}

export default Input
