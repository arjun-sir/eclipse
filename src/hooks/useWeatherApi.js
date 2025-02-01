// src/hooks/useWeatherApi.js
import { useQuery } from '@tanstack/react-query';

const API_KEY = import.meta.env.VITE_APP_API_KEY; // Replace with your OpenWeatherMap API key

const fetchWeather = async ({ city, unit }) => {
  if (!city) return null;
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
  );
  
  if (!response.ok) {
    throw new Error('City not found or API error.');
  }
  
  const data = await response.json();
  localStorage.setItem('lastCity', city);
  return data;
};

const useWeatherApi = (city, unit) => {
  const { data: weather, error, isLoading, refetch } = useQuery({
    queryKey: ['weather', city, unit],
    queryFn: () => fetchWeather({ city, unit }),
    enabled: Boolean(city),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: false,
  });

  return {
    weather,
    error: error?.message,
    loading: isLoading,
    refetch,
  };
};

export default useWeatherApi;
