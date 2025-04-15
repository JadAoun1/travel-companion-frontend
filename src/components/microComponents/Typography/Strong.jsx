import React from 'react';
import styles from './Typography.module.css';

const Strong = ({ children, className = '', ...props }) => {
    return (
        <strong className={`${styles.strong} ${className}`} {...props}>
            {children}
        </strong>
    );
};

export default Strong; 