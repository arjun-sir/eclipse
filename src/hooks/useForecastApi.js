import { useQuery } from '@tanstack/react-query';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const fetchForecast = async ({ city, unit }) => {
  if (!city) return null;
  
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  const data = await response.json();
  return data;
};

const useForecastApi = (city, unit) => {
  const { data: forecast, error, isLoading } = useQuery({
    queryKey: ['forecast', city, unit],
    queryFn: () => fetchForecast({ city, unit }),
    enabled: Boolean(city),
    refetchInterval: 30000,
    retry: false,
  });

  return {
    forecast,
    error: error?.message,
    loading: isLoading,
  };
};

export default useForecastApi; 