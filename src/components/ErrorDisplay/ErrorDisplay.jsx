// src/components/ErrorDisplay.jsx
import React from 'react';
import styles from './ErrorDisplay.module.css';

const ErrorDisplay = ({ message }) => {
  if (!message) return null;

  return (
    <div className={styles.error}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorDisplay;
