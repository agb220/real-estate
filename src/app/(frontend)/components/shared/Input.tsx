import { LocationSvg } from '../icons'

const Input = () => {
  return (
    <div className="input-wrapper input--icon">
      <LocationSvg />
      <input type="text" className="input " placeholder="Search of location" />
    </div>
  )
}

export default Input
