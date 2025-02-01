// src/App.jsx
import React, { useContext, useEffect, useState } from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import ForecastDisplay from './components/ForecastDisplay/ForecastDisplay';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
import Layout from './components/Layout/Layout';
import useWeatherApi from './hooks/useWeatherApi';
import useForecastApi from './hooks/useForecastApi';
import { WeatherContext } from './context/WeatherContext';
import styles from './components/Layout/Layout.module.css';

const App = () => {
  const { city, setCity, unit, setUnit } = useContext(WeatherContext);
  const [searchCity, setSearchCity] = useState(city);
  const { 
    weather, 
    error: weatherError, 
    loading: weatherLoading,
    refetch: refetchWeather 
  } = useWeatherApi(searchCity, unit);
  const { 
    forecast, 
    error: forecastError, 
    loading: forecastLoading,
    refetch: refetchForecast 
  } = useForecastApi(searchCity, unit);

  // When context city changes (for example, on load), update searchCity so hook runs
  useEffect(() => {
    if (city && city !== searchCity) {
      setSearchCity(city);
    }
  }, [city, searchCity]);

  const handleSearch = (newCity) => {
    setCity(newCity);
    setSearchCity(newCity);
  };

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const handleRetry = () => {
    refetchWeather();
    refetchForecast();
  };

  const loading = weatherLoading || forecastLoading;
  const error = weatherError || forecastError;

  return (
    <Layout>
      <h1 className={styles.title}>Eclipse Dashboard</h1>
      <div className={styles.unitToggle}>
        <button 
          onClick={toggleUnit}
          className={styles.button}
        >
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>
      <SearchInput onSearch={handleSearch} />
      {loading && (
        <div className={styles.loadingContainer}>
          Loading...
        </div>
      )}
      <ErrorDisplay message={error} onRetry={handleRetry} />
      {weather && !error && (
        <>
          <WeatherDisplay weather={weather} unit={unit} />
          <ForecastDisplay forecast={forecast} unit={unit} />
        </>
      )}
    </Layout>
  );
};

export default App;
