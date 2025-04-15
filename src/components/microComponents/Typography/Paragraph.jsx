import React from 'react';
import styles from './Typography.module.css';

const Paragraph = ({ children, className = '', ...props }) => {
    return (
        <p className={`${styles.paragraph} ${className}`} {...props}>
            {children}
        </p>
    );
};

export default Paragraph; 