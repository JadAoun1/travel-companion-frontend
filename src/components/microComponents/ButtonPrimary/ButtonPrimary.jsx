import React from 'react';
import styles from './ButtonPrimary.module.css';

const ButtonPrimary = ({ children, onClick, type = 'button', disabled = false, ...props }) => {
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

export default ButtonPrimary; 