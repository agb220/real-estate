import React from 'react'

interface LocationMapProps {
  mapUrl: string
}

const LocationMap: React.FC<LocationMapProps> = ({ mapUrl }) => {
  return (
    <div className="map">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  )
}

export default LocationMap
