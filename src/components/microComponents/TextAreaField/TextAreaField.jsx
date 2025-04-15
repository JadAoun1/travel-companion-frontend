import React from 'react';
import styles from './TextAreaField.module.css';

const TextAreaField = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    rows = 4, // Default number of rows
    required = false,
    disabled = false,
    error = null,
    ...props
}) => {
    // Generate a unique ID if one isn't provided
    const textAreaId = id || `textarea-${label.replace(/\s+/g, '').toLowerCase()}`;

    return (
        <div className={styles.container}>
            {label && (
                <label htmlFor={textAreaId} className={styles.label}>
                    {label}{required && ' *'}
                </label>
            )}
            <textarea
                id={textAreaId}
                className={`${styles.textarea} ${error ? styles.error : ''}`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
                required={required}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={error ? `${textAreaId}-error` : undefined}
                {...props}
            />
            {error && (
                <span id={`${textAreaId}-error`} className={styles.errorMessage} role="alert">
                    {error}
                </span>
            )}
        </div>
    );
};

export default TextAreaField; 