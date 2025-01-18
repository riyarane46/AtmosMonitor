import { useState } from 'react';
import "./SearchBox.css";

export default function SearchBox({ updateInfo }) {
    const [city, setCity] = useState("");
    const [error, setError] = useState(false);

    const handleChange = (e) => {
        setCity(e.target.value);
        setError(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Simply pass the city to updateInfo function
            // The parent WeatherApp component will handle both current weather and forecast
            await updateInfo(city);
            setCity("");
        } catch (err) {
            setError(true);
        }
    }

    return (
        <div className='search-container'>
            <form onSubmit={handleSubmit} className="search-form">
                <input
                    type="text"
                    placeholder="Enter city name..."
                    value={city}
                    onChange={handleChange}
                    className="search-input"
                    required
                />
                <button type="submit" className="search-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </form>
            {error && <p className="error-message">No such place exists!</p>}
        </div>
    )
}
