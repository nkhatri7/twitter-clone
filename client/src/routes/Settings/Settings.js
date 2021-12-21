import React from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import SettingsHeader from '../../components/SettingsHeader/SettingsHeader';
import './Settings.scss';

const Settings = ({ activeUser }) => {

    return (
        <div className='settings'>
            <SettingsHeader activeUser={activeUser} pageTitle={'Settings'} />
            <main className="settings-main">
                <DesktopMenu activeUser={activeUser} page="Settings" />
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
            </main>
            <MobileFooterMenu page={'settings'} />
        </div>
    );
}

export default Settings;
