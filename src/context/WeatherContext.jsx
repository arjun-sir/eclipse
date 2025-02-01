// src/context/WeatherContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(() => {
    // Load last searched city from localStorage on initial load
    return localStorage.getItem('lastCity') || '';
  });
  
  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('tempUnit') || 'metric';
  });

  // Save unit preference when it changes
  useEffect(() => {
    localStorage.setItem('tempUnit', unit);
  }, [unit]);

  return (
    <WeatherContext.Provider value={{ city, setCity, unit, setUnit }}>
      {children}
    </WeatherContext.Provider>
  );
};
