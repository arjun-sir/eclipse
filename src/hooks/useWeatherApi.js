// src/hooks/useWeatherApi.js
import { useState, useEffect, useCallback } from 'react';

const API_KEY = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key

const useWeatherApi = (city) => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = useCallback(async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found or API error.');
      }
      const data = await response.json();
      setWeather(data);
      // Save last searched city to localStorage
      localStorage.setItem('lastCity', city);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [city]);

  // Fetch on city change and set up polling
  useEffect(() => {
    fetchWeather();
    const intervalId = setInterval(fetchWeather, 30000); // polling every 30 seconds
    return () => clearInterval(intervalId);
  }, [fetchWeather]);

  return { weather, error, loading, refetch: fetchWeather };
};

export default useWeatherApi;
