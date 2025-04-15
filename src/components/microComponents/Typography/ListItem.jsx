import React from 'react';
import styles from './Typography.module.css';

const ListItem = ({ children, className = '', ...props }) => {
    return (
        <li className={`${styles.listItem} ${className}`} {...props}>
            {children}
        </li>
    );
};

export default ListItem; 