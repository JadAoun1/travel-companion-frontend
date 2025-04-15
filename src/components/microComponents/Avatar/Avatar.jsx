import React from 'react';
import styles from './Avatar.module.css';

const Avatar = ({
    src,
    alt = 'Avatar',
    initials,
    size = 'md', // e.g., 'sm', 'md', 'lg'
    bordered = false,
    className = '',
    ...props
}) => {

    const sizeClass = styles[`size-${size}`] || styles['size-md'];
    const borderClass = bordered ? styles.bordered : '';

    return (
        <div
            className={`${styles.avatar} ${sizeClass} ${borderClass} ${className}`}
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