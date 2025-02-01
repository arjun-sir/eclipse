// src/context/WeatherContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(() => {
    // Load last searched city from localStorage on initial load
    return localStorage.getItem('lastCity') || '';
  });

  return (
    <WeatherContext.Provider value={{ city, setCity }}>
      {children}
    </WeatherContext.Provider>
  );
};
