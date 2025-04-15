import React from 'react';
import styles from './Avatar.module.css';

const Avatar = ({
    src,
    alt = 'Avatar',
    initials,
    size = 'md', // e.g., 'sm', 'md', 'lg'
    shape = 'circle', // 'circle' or 'square'
    bordered = false,
    className = '',
    ...props
}) => {

    const sizeClass = styles[`size-${size}`] || styles['size-md'];
    const shapeClass = styles[`shape-${shape}`] || styles['shape-circle'];
    const borderClass = bordered ? styles.bordered : '';

    return (
        <div
            className={`${styles.avatar} ${sizeClass} ${shapeClass} ${borderClass} ${className}`}
            aria-label={alt}
            {...props}
        >
            {src ? (
                <img src={src} alt={alt} className={styles.image} />
            ) : initials ? (
                <span className={styles.initials}>{initials.substring(0, 2)}</span>
            ) : (
                // Optional: Add a default placeholder icon/pattern if needed
                <span className={styles.initials}>?</span>
            )}
        </div>
    );
};

export default Avatar; 