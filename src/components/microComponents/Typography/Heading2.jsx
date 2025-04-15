import React from 'react';
import styles from './Typography.module.css';

const Heading2 = ({ children, className = '', ...props }) => {
    return (
        <h2 className={`${styles.heading2} ${className}`} {...props}>
            {children}
        </h2>
    );
};

export default Heading2; 