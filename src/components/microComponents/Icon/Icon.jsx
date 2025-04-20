import React from 'react';
import * as FeatherIcons from 'react-icons/fi';
import styles from './Icon.module.css';

const Icon = ({
    name, // The name of the Feather icon (e.g., 'FiCamera', 'FiUser')
    size = 'var(--font-size-md)', // Default size using CSS variable
    color = 'var(--color-text-primary)', // Default color using CSS variable
    className = '',
    style = {},
    variant = '', // '', 'bordered', or 'background'
    interactive = false, // Whether the icon is interactive (clickable)
    sizeClass = 'md', // 'sm', 'md', or 'lg'
    ...props
}) => {
    // Find the icon component from the FeatherIcons object
    const IconComponent = FeatherIcons[name];

    if (!IconComponent) {
        // Handle the case where the icon name is invalid or not found
        console.warn(`Icon "${name}" not found in Feather Icons (react-icons/fi).`);
        // Render a placeholder or null
        return <span style={{ display: 'inline-block', width: size, height: size }} aria-hidden="true"></span>;
    }

    // Combine styles passed via prop with defaults
    const combinedStyle = {
        verticalAlign: 'middle', // Helps align icons with text
        ...style,
    };

    // Combine class names based on props
    const containerClassNames = [
        styles.iconContainer,
        variant && styles[variant],
        interactive && styles.interactive,
        sizeClass && styles[`size-${sizeClass}`],
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={containerClassNames}>
            <IconComponent
                size={size}
                color={color}
                className={styles.icon}
                style={combinedStyle}
                {...props}
            />
        </span>
    );
};

export default Icon; 