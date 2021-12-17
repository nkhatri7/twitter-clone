import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import './Settings.scss';

const Settings = ({ activeUser }) => {

    const navigate = useNavigate();

    return (
        <div className='settings'>
            <header className="settings-header">
                <button className="back" aria-label='Go back' onClick={() => navigate(-1)}>
                    <span className="hidden">Back</span>
                </button>
                <div className="settings-header-content">
                    <h1>Settings</h1>
                    <span className="settings-user-username">@{activeUser ? activeUser.username : ''}</span>
                </div>
            </header>
            <main className="settings-main">
                <nav className="settings-nav">
                    <ul>
                        <li className='settings-link-container'>
                            <Link to={'/settings/account'} className='settings-link'>
                                <span>Your Account</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </li>
                        <li className="settings-link-container">
                            <Link to={'/settings/privacy_and_safety'} className='settings-link'>
                                <span>Privacy and Safety</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </li>
                        <li className="settings-link-container">
                            <Link to={'/settings/notifications'} className='settings-link'>
                                <span>Notifications</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </li> 
                    </ul>
                </nav>
                <MobileFooterMenu page={'settings'} />
            </main>
        </div>
    );
}

export default Settings;
