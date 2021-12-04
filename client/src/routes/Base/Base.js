import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Base.scss';
import twitterLogo from '../../assets/images/twitter-logo.png';

const Base = () => {

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate('/signup');
    }

    const handleLoginClick = () => {
        navigate('/login');
    }

    return (
        <main>
            <div className="main-signup-login">
                <h1 className="hidden">Twitter</h1>
                <img src={twitterLogo} alt="Twitter logo" className="logo" />
                <span className="intro-message">Happening now</span>
                <div className="actions-container">
                    <div className="signup-container">
                        <span className="signup-text">Join Twitter today.</span>
                        <button className="signup-button" onClick={handleSignUpClick}>Sign up</button>
                        <span className="signup-info">By signing up, you agree to the <span className="info-link">Terms of Service </span> 
                        and <span className="info-link">Privacy Policy</span>, including <span className="info-link">Cookie Use</span>.</span>
                    </div>
                    <div className="login-container">
                        <span className="login-text">Already have an account?</span>
                        <button className="login-button" onClick={handleLoginClick}>Sign in</button>
                    </div>
                </div>
            </div>
            <div className="base-graphic">
                <img src={twitterLogo} alt="Twitter logo" />
            </div>
        </main>
    );
}

export default Base;
