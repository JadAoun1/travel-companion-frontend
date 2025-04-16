import React from 'react';
import styles from './Typography.module.css';

const Heading1 = ({ children, className = '', ...props }) => {
    return (
        <h1 className={`${styles.heading1} ${className}`} {...props}>
            {children}
        </h1>
    );
};

export default Heading1; 