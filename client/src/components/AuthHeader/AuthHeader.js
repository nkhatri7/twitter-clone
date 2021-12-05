import React from 'react';
import { useNavigate } from 'react-router';
import './AuthHeader.scss';
import twitterLogo from '../../assets/images/twitter-logo.png';

const AuthHeader = () => {
    
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    }

    return (
        <header className="authheader">
            <button className="close" aria-label="Go back to previous screen" onClick={handleClose}>
                <span className="hidden">Back</span>
            </button>
            <img src={twitterLogo} alt="Twitter logo" className="logo" />
        </header>
    );
}

export default AuthHeader;
