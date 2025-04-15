import React from 'react';
import styles from './Typography.module.css';

const Blockquote = ({ children, className = '', ...props }) => {
    return (
        <blockquote className={`${styles.blockquote} ${className}`} {...props}>
            {children}
        </blockquote>
    );
};

export default Blockquote; 