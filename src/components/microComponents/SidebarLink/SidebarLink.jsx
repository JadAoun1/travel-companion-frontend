import React from 'react';
import Icon from '../Icon/Icon'; // Adjust path as needed
import styles from './SidebarLink.module.css';

// **Integration with React Router:**
// Similar to NavLink, replace <a> with <RouterNavLink> from 'react-router-dom'
// and use the className function to apply the active style.
// Example:
// import { NavLink as RouterNavLink } from 'react-router-dom';
// ...
// return (
//   <RouterNavLink
//     to={to}
//     className={({ isActive }) =>
//       `${styles.sidebarLink} ${isActive ? styles.active : ''} ${className}`
//     }
//     {...props}
//   >
//     {iconName && <Icon name={iconName} className={styles.icon} />}
//     <span className={styles.text}>{children}</span>
//   </RouterNavLink>
// );

const SidebarLink = ({ children, href, to, iconName, className = '', ...props }) => {
    // Determine the actual link prop based on whether 'to' or 'href' is provided
    const linkProps = to ? { href: to } : { href: href || '#' };

    return (
        // Using a standard <a> tag for now. Replace with Router NavLink if using react-router.
        <a
            className={`${styles.sidebarLink} ${className}`}
            {...linkProps}
            {...props}
        >
            {iconName && <Icon name={iconName} className={styles.icon} size="1.2em" />} {/* Adjust size as needed */}
            <span className={styles.text}>{children}</span>
        </a>
    );
};

export default SidebarLink; 