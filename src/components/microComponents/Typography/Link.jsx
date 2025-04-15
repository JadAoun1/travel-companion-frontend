import React from 'react';
import styles from './Typography.module.css';

// Basic link component, often used with React Router's Link or NavLink
// For external links, use standard href
const Link = ({ children, href, to, className = '', ...props }) => {
    const Component = to ? 'a' : 'a'; // Placeholder - Integrate with router later if needed
    const linkProps = to ? { to } : { href }; // Adapt based on router usage

    return (
        <Component className={`${styles.link} ${className}`} {...linkProps} {...props}>
            {children}
        </Component>
    );
};

export default Link; 