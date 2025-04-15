import React from 'react';
import styles from './Typography.module.css';

// Note: We already have a block-level 'Caption' component using <small>
// This is for inline usage.
const InlineSmall = ({ children, className = '', ...props }) => {
    return (
        <small className={`${styles.inlineSmall} ${className}`} {...props}>
            {children}
        </small>
    );
};

export default InlineSmall; 