import React from 'react';
import styles from './Dialog.module.css';

const Dialog = ({ title, message, actions, onClose }) => {
  return (
    <div className={styles['dialog-container']} onClick={onClose}>
      <div className={styles['dialog-box']} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>

        {actions && (
          <div className={styles['dialog-actions']}>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dialog;
