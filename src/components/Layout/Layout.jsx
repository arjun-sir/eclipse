import React from 'react';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.root}>
      <div className={styles.body}>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout; 