// src/components/SearchInput.jsx
import React, { useState, useContext } from 'react';
import { WeatherContext } from '../../context/WeatherContext';
import styles from './SearchInput.module.css'; // Create this CSS module

const SearchInput = ({ onSearch }) => {
  const { city } = useContext(WeatherContext);
  const [searchValue, setSearchValue] = useState(city);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue.trim() !== '') {
      onSearch(searchValue);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
};

export default SearchInput;
