import React from 'react';
import styles from './Typography.module.css';

const Heading3 = ({ children, className = '', ...props }) => {
    return (
        <h3 className={`${styles.heading3} ${className}`} {...props}>
            {children}
        </h3>
    );
};

export default Heading3; 