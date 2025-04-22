import React from 'react';
import styles from './NavLink.module.css';


const NavLink = ({ children, href, to, className = '', ...props }) => {
    const linkProps = to ? { href: to } : { href: href || '#' }; 
    return (
        <a
            className={`${styles.navLink} ${className}`}
            {...linkProps}
            {...props}
        >
            {children}
        </a>
    );
};

export default NavLink; 