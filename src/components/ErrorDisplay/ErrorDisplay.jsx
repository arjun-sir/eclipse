// src/components/ErrorDisplay.jsx
import React from 'react';
import styles from './ErrorDisplay.module.css';

const ErrorDisplay = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.errorIcon}>⚠️</div>
        <h3 className={styles.errorTitle}>Error</h3>
        <p className={styles.errorMessage}>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className={styles.retryButton}>
            Try Again
          </button>
        )}
        <div className={styles.helpText}>
          <p>Need help? Try:</p>
          <ul>
            <li>Checking the city name spelling</li>
            <li>Using a more specific location</li>
            <li>Checking your internet connection</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay;
