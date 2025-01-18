import { useState } from 'react'
import "./CurrentLocation.css"


const CurrentLocation = ({ onLocationUpdate }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const getCurrentLocation = () => {
    setIsLoading(true)
    setError(null)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          onLocationUpdate({ latitude, longitude })
          setIsLoading(false)
        },
        (error) => {
          setError('Unable to retrieve your location')
          setIsLoading(false)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      )
    } else {
      setError('Geolocation is not supported by your browser')
      setIsLoading(false)
    }
  }

  return (
    <div className="location-container">
      <button
        onClick={getCurrentLocation}
        disabled={isLoading}
        className="location-button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="location-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        {isLoading ? 'Getting Location...' : 'Use My Location'}
      </button>
      {error && <p className="location-error">{error}</p>}
    </div>
  )
}

export default CurrentLocation
