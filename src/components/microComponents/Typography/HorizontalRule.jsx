import React from 'react';
import styles from './Typography.module.css';

const HorizontalRule = ({ className = '', ...props }) => {
    return (
        <hr className={`${styles.horizontalRule} ${className}`} {...props} />
    );
};

export default HorizontalRule; 