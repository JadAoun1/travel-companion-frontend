import React from 'react';
import styles from './Typography.module.css';

const Code = ({ children, className = '', ...props }) => {
    return (
        <pre className={`${styles.preformatted} ${className}`} {...props}>
            <code className={styles.code}>
                {children}
            </code>
        </pre>
    );
};

export default Code; 