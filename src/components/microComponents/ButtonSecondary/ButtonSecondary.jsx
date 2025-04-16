import React from 'react';
import styles from './ButtonSecondary.module.css';

const ButtonSecondary = ({ children, onClick, type = 'button', disabled = false, ...props }) => {
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

export default ButtonSecondary; 