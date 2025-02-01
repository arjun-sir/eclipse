// src/App.jsx
import React, { useContext, useEffect, useState } from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import WeatherDisplay from './components/WeatherDisplay/WeatherDisplay';
import ErrorDisplay from './components/ErrorDisplay/ErrorDisplay';
import useWeatherApi from './hooks/useWeatherApi';
import { WeatherContext } from './context/WeatherContext';

const App = () => {
  const { city, setCity, unit, setUnit } = useContext(WeatherContext);
  const [searchCity, setSearchCity] = useState(city);
  const { weather, error, loading } = useWeatherApi(searchCity, unit);

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

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>React Weather Dashboard</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={toggleUnit}>
          Switch to {unit === 'metric' ? '°F' : '°C'}
        </button>
      </div>
      <SearchInput onSearch={handleSearch} />
      {loading && <p style={{ textAlign: 'center' }}>Loading...</p>}
      <ErrorDisplay message={error} />
      {weather && !error && <WeatherDisplay weather={weather} unit={unit} />}
    </div>
  );
};

export default App;
