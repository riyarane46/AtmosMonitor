import { useState } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import WeekForecast from './WeekForecast';
import './WeatherApp.css';
import CurrentLocation from './CurrentLocation';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState({
        city: "Delhi",
        temp: 25.5,
        humidity: 2,
        tempMin: 20,
        tempMax: 5,
        feelsLike: 26.5,
        weather: "Sunny"
    });
    
    const [forecastData, setForecastData] = useState(null);
    
    const API_KEY = "a14ed1b07c1e0a30a0d914d9814cbaa3";

    const handleLocationUpdate = async ({ latitude, longitude }) => {
        try {
            // Current weather
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            
            // Forecast data
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const forecastData = await forecastResponse.json();
            
            // Process forecast data
            const processedForecast = forecastData.list
                .filter((item, index) => index % 8 === 0)
                .slice(0, 7)
                .map(day => ({
                    date: new Date(day.dt * 1000),
                    temp: Math.round(day.main.temp),
                    condition: day.weather[0].main,
                    humidity: day.main.humidity,
                    wind: Math.round(day.wind.speed * 3.6)
                }));
            
            setWeatherInfo({
                city: data.name,
                temp: data.main.temp,
                humidity: data.main.humidity,
                tempMin: data.main.temp_min,
                tempMax: data.main.temp_max,
                feelsLike: data.main.feels_like,
                weather: data.weather[0].main
            });
            
            setForecastData(processedForecast);
        } catch (error) {
            console.error('Error fetching weather:', error);
        }
    };

    let updateInfo = async (city) => {
        try {
            // Get coordinates first
            const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();
            
            if (geoData.length > 0) {
                const { lat, lon } = geoData[0];
                handleLocationUpdate({ latitude: lat, longitude: lon });
            }
        } catch (error) {
            console.error('Error updating weather:', error);
        }
    }

    return (
        <div className="weather-app-container">
            <div className="title-container">
                <h1 className="weather-title">AtmosMonitor</h1>
                <span className="title-underline"></span>
            </div>
            <CurrentLocation onLocationUpdate={handleLocationUpdate} />
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo} />
            {forecastData && <WeekForecast data={forecastData} />}
        </div>
    );
}
