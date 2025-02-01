export class WeatherApiError extends Error {
  constructor(message, code, originalError = null) {
    super(message);
    this.name = 'WeatherApiError';
    this.code = code;
    this.originalError = originalError;
  }
}

export const getErrorMessage = (error) => {
  if (error instanceof WeatherApiError) {
    switch (error.code) {
      case 404:
        return 'City not found. Please check the spelling and try again.';
      case 401:
        return 'API key is invalid. Please contact support.';
      case 429:
        return 'Too many requests. Please try again later.';
      case 'NETWORK_ERROR':
        return 'Unable to connect to weather service. Please check your internet connection.';
      case 'LOCATION_ERROR':
        return 'Invalid location format. Please enter a valid city name.';
      default:
        return error.message || 'An unexpected error occurred. Please try again.';
    }
  }
  
  if (error.name === 'AbortError') {
    return 'Request timed out. Please try again.';
  }

  return 'An unexpected error occurred. Please try again.';
}; 