import React from 'react';
import * as FeatherIcons from 'react-icons/fi';

const Icon = ({
    name, // The name of the Feather icon (e.g., 'FiCamera', 'FiUser')
    size = 'var(--font-size-md)', // Default size using CSS variable
    color = 'var(--color-text-primary)', // Default color using CSS variable
    className = '',
    style = {},
    ...props
}) => {

    // Find the icon component from the FeatherIcons object
    // Ensure the name matches the export format (e.g., 'FiCamera')
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

    return (
        <IconComponent
            size={size}
            color={color}
            className={className}
            style={combinedStyle}
            {...props}
        />
    );
};

export default Icon; 