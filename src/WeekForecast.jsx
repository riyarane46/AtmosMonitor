import React from 'react';
import './WeekForecast.css';

export default function WeekForecast({ data }) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="week-forecast-container">
            <h2 className="forecast-title">Forecast</h2>
            <div className="forecast-grid">
                {data.map((day, index) => (
                    <div className="forecast-card" key={index}>
                        <h3 className="day-name">{daysOfWeek[new Date(day.date).getDay()]}</h3>
                        <img 
                            src={`/weather-icons/${day.condition.toLowerCase()}.jpg`} 
                            alt={day.condition}
                            className="forecast-icon"
                        />
                        <div className="temperature">{day.temp}°C</div>
                        <div className="condition">{day.condition}</div>
                        <div className="metrics">
                            <div className="humidity">
                                <span>Humidity: {day.humidity}%</span>
                            </div>
                            <div className="wind">
                                <span>Wind: {day.wind} km/h</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
