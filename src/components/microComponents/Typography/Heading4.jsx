import React from 'react';
import styles from './Typography.module.css';

const Heading4 = ({ children, className = '', ...props }) => {
    return (
        <h4 className={`${styles.heading4} ${className}`} {...props}>
            {children}
        </h4>
    );
};

export default Heading4; 