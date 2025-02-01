// src/hooks/useWeatherApi.js
import { useQuery } from '@tanstack/react-query';
import { WeatherApiError, getErrorMessage } from '../utils/errorUtils';

const API_KEY = import.meta.env.VITE_APP_API_KEY; // Replace with your OpenWeatherMap API key

const fetchWeather = async ({ city, unit }) => {
  if (!city) return null;
  
  // Validate city name format
  if (!/^[a-zA-Z\s-]+$/.test(city)) {
    throw new WeatherApiError('Invalid city name format', 'LOCATION_ERROR');
  }

  // Create AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new WeatherApiError(
        'Failed to fetch weather data',
        response.status
      );
    }

    const data = await response.json();
    localStorage.setItem('lastCity', city);
    return data;
  } catch (error) {
    if (error instanceof WeatherApiError) {
      throw error;
    }
    if (!navigator.onLine) {
      throw new WeatherApiError(
        'No internet connection',
        'NETWORK_ERROR',
        error
      );
    }
    if (error.name === 'AbortError') {
      throw new WeatherApiError(
        'Request timed out',
        'TIMEOUT_ERROR',
        error
      );
    }
    throw new WeatherApiError(
      'Failed to fetch weather data',
      'UNKNOWN_ERROR',
      error
    );
  } finally {
    clearTimeout(timeoutId);
  }
};

const useWeatherApi = (city, unit) => {
  const { data: weather, error, isLoading, refetch } = useQuery({
    queryKey: ['weather', city, unit],
    queryFn: () => fetchWeather({ city, unit }),
    enabled: Boolean(city),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: (failureCount, error) => {
      // Only retry network errors, up to 3 times
      return error.code === 'NETWORK_ERROR' && failureCount < 3;
    },
    onError: (error) => {
      console.error('Weather API Error:', {
        message: error.message,
        code: error.code,
        originalError: error.originalError
      });
    }
  });

  return {
    weather,
    error: error ? getErrorMessage(error) : null,
    loading: isLoading,
    refetch,
  };
};

export default useWeatherApi;
