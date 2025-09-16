import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'
import { LocationSvg } from '../icons'

interface CommonProps {
  icon?: boolean
  error?: string
  label?: string
  textarea?: boolean
  className?: string
}

type InputProps =
  | (CommonProps & InputHTMLAttributes<HTMLInputElement>)
  | (CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>)

const Input = (props: InputProps) => {
  const { label, icon, textarea, error, ...rest } = props

  return (
    <div className={`input-block ${props.className}`}>
      {label && (
        <label className="label" htmlFor={label}>
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          className="input textarea--input"
          placeholder={props.placeholder}
          {...(rest as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          name={label}
          id={label}
          maxLength={150}
        />
      ) : (
        <div className="input-wrapper input--icon">
          {icon && <LocationSvg />}

          <input
            type="text"
            className="input"
            placeholder={props.placeholder}
            {...(rest as InputHTMLAttributes<HTMLInputElement>)}
            name={label}
            id={label}
          />
        </div>
      )}
      {error && <p className="input-error">{error}</p>}
    </div>
  )
}

export default Input
