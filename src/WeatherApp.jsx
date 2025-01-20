import { useState } from 'react';
import SearchBox from './SearchBox';
import InfoBox from './InfoBox';
import WeekForecast from './WeekForecast';
import './WeatherApp.css';
import CurrentLocation from './CurrentLocation';

export default function WeatherApp() {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [forecastData, setForecastData] = useState(null);
    
    const API_KEY = "a14ed1b07c1e0a30a0d914d9814cbaa3";

    const handleLocationUpdate = async ({ latitude, longitude }) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();
            
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            const forecastData = await forecastResponse.json();
            
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

    const updateInfo = async (city) => {
        try {
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();
            
            if (geoData.length > 0) {
                const location = geoData.find(loc => loc.country) || geoData[0];
                const { lat, lon, name } = location;
                
                const weatherResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                const weatherData = await weatherResponse.json();
                
                const forecastResponse = await fetch(
                    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
                );
                const forecastData = await forecastResponse.json();
                
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
                    city: name, // Only using the city name now
                    temp: weatherData.main.temp,
                    humidity: weatherData.main.humidity,
                    tempMin: weatherData.main.temp_min,
                    tempMax: weatherData.main.temp_max,
                    feelsLike: weatherData.main.feels_like,
                    weather: weatherData.weather[0].main
                });
                
                setForecastData(processedForecast);
            }
        } catch (error) {
            console.error('Error updating weather:', error);
        }
    };

    return (
        <div className="weather-app-container">
            <div className="title-container">
                <h1 className="weather-title">ATMOS&nbsp; MONITOR</h1>
                <span className="title-underline"></span>
            </div>
            <CurrentLocation onLocationUpdate={handleLocationUpdate} />
            <SearchBox updateInfo={updateInfo}/>
            {weatherInfo && <InfoBox info={weatherInfo} />}
            {forecastData && <WeekForecast data={forecastData} />}
        </div>
    );
}
