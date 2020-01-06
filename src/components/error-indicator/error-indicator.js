import React from 'react';
import './error-indicator.css';
import iconErr from './Death_Star.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={iconErr} alt="error-icon" className="img-err"/>
            <span className="boom">BOOM!</span>
            <span>something has gone terribly wrong</span>
            <span>(but we already sent droids to fix it)</span>
        </div>
    );
};

export default ErrorIndicator;