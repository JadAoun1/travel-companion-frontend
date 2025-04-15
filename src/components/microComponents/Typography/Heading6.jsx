import React from 'react';
import styles from './Typography.module.css';

const Heading6 = ({ children, className = '', ...props }) => {
    return (
        <h6 className={`${styles.heading6} ${className}`} {...props}>
            {children}
        </h6>
    );
};

export default Heading6; 