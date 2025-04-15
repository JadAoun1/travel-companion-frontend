import React from 'react';
import styles from './Typography.module.css';

const OrderedList = ({ children, className = '', ...props }) => {
    return (
        <ol className={`${styles.orderedList} ${className}`} {...props}>
            {children}
        </ol>
    );
};

export default OrderedList; 