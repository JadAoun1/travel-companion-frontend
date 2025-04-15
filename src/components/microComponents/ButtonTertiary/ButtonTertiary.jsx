import React from 'react';
import styles from './ButtonTertiary.module.css';

const ButtonTertiary = ({ children, onClick, type = 'button', disabled = false, ...props }) => {
    return (
        <button
            className={styles.button}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default ButtonTertiary; 