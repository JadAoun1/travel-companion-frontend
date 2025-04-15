import React from 'react';
import styles from './Typography.module.css';

const InlineCode = ({ children, className = '', ...props }) => {
    return (
        <code className={`${styles.inlineCode} ${className}`} {...props}>
            {children}
        </code>
    );
};

export default InlineCode; 