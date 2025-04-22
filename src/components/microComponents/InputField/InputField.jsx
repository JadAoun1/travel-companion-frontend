import React from 'react';
import styles from './InputField.module.css';

const InputField = ({
    id,
    label,
    type = 'text',
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    error = null,
    ...props
}) => {
    const inputId = id || `input-${label.replace(/\s+/g, '').toLowerCase()}`;

    return (
        <div className={styles.container}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}{required && ' *'}
                </label>
            )}
            <input
                id={inputId}
                className={`${styles.input} ${error ? styles.error : ''}`}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                aria-invalid={!!error}
                aria-describedby={error ? `${inputId}-error` : undefined}
                {...props}
            />
            {error && (
                <span id={`${inputId}-error`} className={styles.errorMessage} role="alert">
                    {error}
                </span>
            )}
        </div>
    );
};

export default InputField; 