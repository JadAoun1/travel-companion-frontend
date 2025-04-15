import React from 'react';
import styles from './Typography.module.css';

const Mark = ({ children, className = '', ...props }) => {
    return (
        <mark className={`${styles.mark} ${className}`} {...props}>
            {children}
        </mark>
    );
};

export default Mark; 