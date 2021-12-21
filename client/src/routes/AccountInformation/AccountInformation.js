import React from 'react';
import { Link } from 'react-router-dom';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import SettingsHeader from '../../components/SettingsHeader/SettingsHeader';
import './AccountInformation.scss';

const AccountInformation = ({ activeUser }) => {

    const getAccountCreationTime = () => {
        const creationDateTime = new Date(activeUser.createdAt);
        const hours = creationDateTime.getHours() > 12 ? (creationDateTime.getHours() - 12) : creationDateTime.getHours();
        const minutes = creationDateTime.getMinutes();
        const seconds = creationDateTime.getSeconds();
        if (creationDateTime.getHours() > 12) {
            return `${creationDateTime.toDateString()}, ${hours}:${formatNumber(minutes)}:${formatNumber(seconds)} PM`;
        } else {
            return `${creationDateTime.toDateString()}, ${hours}:${formatNumber(minutes)}:${formatNumber(seconds)} AM`;
        }
    }

    const formatNumber = (num) => {
        return num < 10 ? `0${num}` : num;
    }

    return (
        <div className='account-information'>
            <SettingsHeader activeUser={activeUser} pageTitle={'Account Information'} />
            <main className="account-information-main">
                <DesktopMenu activeUser={activeUser} page="Account Information" />
                <nav className="account-information-nav">
                    <ul>
                        <li className="account-information-link-container">
                            <Link to={'/settings/username'} className="account-information-link">
                                <div className="link-content">
                                    <span className="link-title">Username</span>
                                    <span className="link-secondary-text">@{activeUser ? activeUser.username : ''}</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </li>
                        <li className="account-information-link-container">
                            <Link to={'/settings/email'} className="account-information-link">
                                <div className="link-content">
                                    <span className="link-title">Email</span>
                                    <span className="link-secondary-text">@{activeUser ? activeUser.email : ''}</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="account-creation-container">
                    <span className="account-creation-title">Account creation</span>
                    <span className="account-creation-time">{activeUser ? getAccountCreationTime() : ''}</span>
                </div>
                <MobileFooterMenu page={'account information'} />
            </main>
        </div>
    );
}

export default AccountInformation;
