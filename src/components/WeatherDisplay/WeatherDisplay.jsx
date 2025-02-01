// src/components/WeatherDisplay.jsx
import React from 'react';
import styles from './WeatherDisplay.module.css';

const WeatherDisplay = ({ weather, unit }) => {
  if (!weather) return null;
  
  const { name, main, wind, weather: weatherDetails } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <div className={styles.container}>
      <h2>{name}</h2>
      <img src={iconUrl} alt={weatherDetails[0].description} className={styles.icon} />
      <p>Temperature: {Math.round(main.temp)}°{unit === 'metric' ? 'C' : 'F'}</p>
      <p>Humidity: {main.humidity}%</p>
      <p>Wind Speed: {wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</p>
      <p>Condition: {weatherDetails[0].main}</p>
    </div>
  );
};

export default WeatherDisplay;
