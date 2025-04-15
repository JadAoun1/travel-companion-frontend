import React from 'react';
import Icon from '../Icon/Icon'; // Adjust path as needed
import { Strong } from '../Typography'; // For optional title
import styles from './Alert.module.css';

// Mapping alert types to Feather icon names and default titles
const alertDetails = {
    error: { icon: 'FiAlertTriangle', defaultTitle: 'Error' },
    success: { icon: 'FiCheckCircle', defaultTitle: 'Success' },
    warning: { icon: 'FiAlertCircle', defaultTitle: 'Warning' },
    info: { icon: 'FiInfo', defaultTitle: 'Info' },
};

const Alert = ({
    type = 'info', // 'error', 'success', 'warning', 'info'
    title,
    children,
    showIcon = true,
    closable = false,
    onClose,
    className = '',
    ...props
}) => {

    const details = alertDetails[type] || alertDetails.info;
    const typeClass = styles[`alert-${type}`] || styles['alert-info'];
    const finalTitle = title === null ? null : (title || (children ? null : details.defaultTitle));

    return (
        <div
            className={`${styles.alert} ${typeClass} ${className}`}
            role="alert"
            {...props}
        >
            <div className={styles.mainContent}>
                {showIcon && details.icon && (
                    <Icon name={details.icon} className={styles.icon} size="1.3em" />
                )}
                <div className={styles.textContainer}>
                    {finalTitle && (
                        <Strong className={styles.title}>{finalTitle}</Strong>
                    )}
                    {children && (
                        <div className={styles.message}>{children}</div>
                    )}
                </div>
            </div>
            {closable && (
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                    aria-label="Close alert"
                >
                    <Icon name="FiX" size="1.2em" />
                </button>
            )}
        </div>
    );
};

export default Alert; 