import React from 'react';
import styles from './Typography.module.css';

const UnorderedList = ({ children, className = '', ...props }) => {
    return (
        <ul className={`${styles.unorderedList} ${className}`} {...props}>
            {children}
        </ul>
    );
};

export default UnorderedList; 