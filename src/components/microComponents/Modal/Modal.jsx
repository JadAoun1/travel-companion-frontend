import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Card from '../Card/Card'; // Adjust path as needed
import { Heading3 } from '../Typography'; // For modal title
import Icon from '../Icon/Icon'; // For close button
import styles from './Modal.module.css';

// Create a portal root if it doesn't exist
let portalRoot = document.getElementById('modal-root');
if (!portalRoot) {
    portalRoot = document.createElement('div');
    portalRoot.setAttribute('id', 'modal-root');
    document.body.appendChild(portalRoot);
}

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    className = '',
    cardClassName = '', // Allow styling the inner card
    ...props
}) => {

    // Handle Escape key press
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Optional: Prevent background scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup listener and body style on unmount or when closing
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'auto';
        };
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }

    // Stop propagation on Card click to prevent overlay click handler
    const handleCardClick = (e) => {
        e.stopPropagation();
    };

    return ReactDOM.createPortal(
        <div
            className={`${styles.overlay} ${className}`}
            onClick={onClose} // Close when clicking overlay
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            {...props}
        >
            <Card
                className={`${styles.modalContent} ${cardClassName}`}
                onClick={handleCardClick}
            >
                {/* Modal Header */}
                <div className={styles.header}>
                    {title && (
                        <Heading3 id="modal-title" className={styles.title}>
                            {title}
                        </Heading3>
                    )}
                    <button
                        className={styles.closeButton}
                        onClick={onClose}
                        aria-label="Close modal"
                    >
                        <Icon name="FiX" size="1.5em" />
                    </button>
                </div>

                {/* Modal Body */}
                <div className={styles.body}>
                    {children}
                </div>

                {/* Modal Footer */}
                {footer && (
                    <div className={styles.footer}>
                        {footer}
                    </div>
                )}
            </Card>
        </div>,
        portalRoot
    );
};

export default Modal; 