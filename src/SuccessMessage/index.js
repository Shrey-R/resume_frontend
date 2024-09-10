import React, { useEffect } from 'react';
import styles from './styles.module.css';

const SuccessMessage = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 2000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={styles.successMessage}>
            {message}
        </div>
    );
};

export default SuccessMessage;
