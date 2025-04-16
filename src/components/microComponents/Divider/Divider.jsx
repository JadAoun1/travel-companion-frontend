import React from 'react';
import styles from './Divider.module.css';

const Divider = ({
    orientation = 'horizontal', // 'horizontal' or 'vertical'
    className = '',
    ...props
}) => {

    const orientationClass = styles[`orientation-${orientation}`] || styles['orientation-horizontal'];

    return (
        <div
            className={`${styles.divider} ${orientationClass} ${className}`}
            role="separator" // Accessibility role
            aria-orientation={orientation}
            {...props}
        />
    );
};

export default Divider; 