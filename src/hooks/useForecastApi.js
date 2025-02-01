import { useQuery } from '@tanstack/react-query';
import { WeatherApiError, getErrorMessage } from '../utils/errorUtils';

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const fetchForecast = async ({ city, unit }) => {
  if (!city) return null;

  if (!/^[a-zA-Z\s-]+$/.test(city)) {
    throw new WeatherApiError('Invalid city name format', 'LOCATION_ERROR');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}`,
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new WeatherApiError(
        'Failed to fetch forecast data',
        response.status
      );
    }

    const data = await response.json();
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
      'Failed to fetch forecast data',
      'UNKNOWN_ERROR',
      error
    );
  } finally {
    clearTimeout(timeoutId);
  }
};

const useForecastApi = (city, unit) => {
  const { data: forecast, error, isLoading, refetch } = useQuery({
    queryKey: ['forecast', city, unit],
    queryFn: () => fetchForecast({ city, unit }),
    enabled: Boolean(city),
    refetchInterval: 30000,
    retry: (failureCount, error) => {
      return error.code === 'NETWORK_ERROR' && failureCount < 3;
    },
    onError: (error) => {
      console.error('Forecast API Error:', {
        message: error.message,
        code: error.code,
        originalError: error.originalError
      });
    }
  });

  return {
    forecast,
    error: error ? getErrorMessage(error) : null,
    loading: isLoading,
    refetch
  };
};

export default useForecastApi; 