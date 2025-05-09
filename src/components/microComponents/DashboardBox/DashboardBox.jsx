import React from 'react';
import Card from '../Card/Card'; // Adjust path as needed
import { Heading3 } from '../Typography'; // Import Heading3 or preferred level
import styles from './DashboardBox.module.css';

const DashboardBox = ({ title, children, className = '', rightElement, ...props }) => {
    return (
        // Pass any additional props down to the Card component
        <Card className={`${styles.dashboardBox} ${className}`} {...props}>
            {title && (
                <div className={styles.titleContainer}>
                    <Heading3 className={styles.title}>
                        {title}
                    </Heading3>
                    {rightElement && (
                        <div className={styles.rightElement}>
                            {rightElement}
                        </div>
                    )}
                </div>
            )}
            <div className={styles.content}>
                {children}
            </div>
        </Card>
    );
};

export default DashboardBox; 