import React from 'react';
import styles from './ForecastDisplay.module.css';

const ForecastDisplay = ({ forecast, unit }) => {
  if (!forecast) return null;

  // Group forecast data by day
  const dailyForecasts = forecast.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date] && Object.keys(acc).length < 5) {
      // Take the first forecast of each day, up to 5 days
      acc[date] = item;
    }
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <h2>5-Day Forecast</h2>
      <div className={styles.forecastGrid}>
        {Object.entries(dailyForecasts).map(([date, data]) => (
          <div key={date} className={styles.forecastCard}>
            <h3>{new Date(date).toLocaleDateString('en-US', { weekday: 'short' })}</h3>
            <img 
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              className={styles.icon}
            />
            <p className={styles.temp}>
              {Math.round(data.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </p>
            <p className={styles.description}>{data.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastDisplay; 