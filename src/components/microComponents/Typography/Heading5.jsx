import React from 'react';
import styles from './Typography.module.css';

const Heading5 = ({ children, className = '', ...props }) => {
    return (
        <h5 className={`${styles.heading5} ${className}`} {...props}>
            {children}
        </h5>
    );
};

export default Heading5; 