// src/components/WeatherDisplay.jsx
import React from 'react';
import styles from './WeatherDisplay.module.css';

const WeatherDisplay = ({ weather, unit }) => {
  if (!weather) return null;
  
  const { name, main, wind, weather: weatherDetails } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherDetails[0].icon}@2x.png`;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.cityName}>{name}</h2>
      </div>
      <div className={styles.mainInfo}>
        <div>
          <p className={styles.temperature}>
            {Math.round(main.temp)}°{unit === 'metric' ? 'C' : 'F'}
          </p>
          <img src={iconUrl} alt={weatherDetails[0].description} className={styles.icon} />
          <p className={styles.description}>{weatherDetails[0].main}</p>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Humidity</p>
          <p className={styles.detailValue}>{main.humidity}%</p>
        </div>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Wind Speed</p>
          <p className={styles.detailValue}>
            {wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
          </p>
        </div>
        <div className={styles.detailItem}>
          <p className={styles.detailLabel}>Feels Like</p>
          <p className={styles.detailValue}>
            {Math.round(main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
