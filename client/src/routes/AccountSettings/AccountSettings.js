import React from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import SettingsHeader from '../../components/SettingsHeader/SettingsHeader';
import './AccountSettings.scss';

const AccountSettings = ({ activeUser }) => {

    return (
        <div className='account-settings'>
            <SettingsHeader activeUser={activeUser} pageTitle={'Your Account'} />
            <main className="account-settings-main">
                <DesktopMenu activeUser={activeUser} page="Account Settings" />
                <span className="account-settings-description">
                    See information about your account, change your password, or learn about your account deactivation options
                </span>
                <nav className="account-settings-nav">
                    <ul>
                        <li className='account-settings-link-container'>
                            <Link to={'/settings/your_twitter_data/account'} className='account-settings-link'>
                                <div className="account-settings-link-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <div className="account-settings-link-text">
                                        <span className="link-title">Account Information</span>
                                        <span className="link-description">
                                            See your account information like your username and email address.
                                        </span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </li>
                        <li className='account-settings-link-container'>
                            <Link to={'/settings/password'} className='account-settings-link'>
                                <div className="account-settings-link-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                    </svg>
                                    <div className="account-settings-link-text">
                                        <span className="link-title">Change Password</span>
                                        <span className="link-description">
                                            Change your password at any time.
                                        </span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </li>
                        <li className='account-settings-link-container'>
                            <Link to={'/settings/deactivate'} className='account-settings-link'>
                                <div className="account-settings-link-content">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#E03B39">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <div className="account-settings-link-text">
                                        <span className="link-title red-link-title">Deactivate Your Account</span>
                                        <span className="link-description">
                                            Find out how you can deactivate your account.
                                        </span>
                                    </div>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </main>
            <MobileFooterMenu page={'account settings'} />
        </div>
    );
}

export default AccountSettings;
