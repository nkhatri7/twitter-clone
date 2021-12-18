import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SettingsHeader.scss';

const SettingsHeader = ({ activeUser, pageTitle }) => {

    const navigate = useNavigate();

    return (
        <header className="settings-header">
            <button className="back" aria-label='Go back' onClick={() => navigate(-1)}>
                <span className="hidden">Back</span>
            </button>
            <div className="settings-header-content">
                <h1>{pageTitle}</h1>
                <span className="settings-user-username">@{activeUser ? activeUser.username : ''}</span>
            </div>
        </header>
    );
}

export default SettingsHeader;
