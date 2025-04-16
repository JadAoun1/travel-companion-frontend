import React from 'react';
import styles from './NavLink.module.css';

// **Integration with React Router:**
// If using react-router-dom, you would typically replace the <a> tag below
// with <RouterNavLink> from 'react-router-dom'.
// The styling for the active state in NavLink.module.css relies on
// react-router-dom adding an 'active' class automatically.
// Example:
// import { NavLink as RouterNavLink } from 'react-router-dom';
// ...
// return (
//   <RouterNavLink
//     to={to}
//     className={({ isActive }) => 
//        `${styles.navLink} ${isActive ? styles.active : ''} ${className}`
//     }
//     {...props}
//   >
//     {children}
//   </RouterNavLink>
// );

const NavLink = ({ children, href, to, className = '', ...props }) => {
    // Determine the actual link prop based on whether 'to' (for router) or 'href' is provided
    const linkProps = to ? { href: to } : { href: href || '#' }; // Use href={to} for basic styling compatibility

    return (
        // Using a standard <a> tag for now. Replace with Router NavLink if using react-router.
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