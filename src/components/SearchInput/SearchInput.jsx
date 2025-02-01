// src/components/SearchInput.jsx
import React, { useState } from 'react';
import styles from './SearchInput.module.css'; // Create this CSS module

const SearchInput = ({ onSearch }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      onSearch(city);
      // setCity('');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Search</button>
    </form>
  );
};

export default SearchInput;
