import React from 'react';
import styles from './Typography.module.css';

const Emphasis = ({ children, className = '', ...props }) => {
    return (
        <em className={`${styles.emphasis} ${className}`} {...props}>
            {children}
        </em>
    );
};

export default Emphasis; 