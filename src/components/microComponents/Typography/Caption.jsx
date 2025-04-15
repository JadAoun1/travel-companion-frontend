import React from 'react';
import styles from './Typography.module.css';

const Caption = ({ children, className = '', ...props }) => {
    return (
        <small className={`${styles.caption} ${className}`} {...props}>
            {children}
        </small>
    );
};

export default Caption; 