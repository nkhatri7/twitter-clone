import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import SettingsHeader from '../../components/SettingsHeader/SettingsHeader';
import './ChangeEmail.scss';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const ChangeEmail = ({ activeUser, handleEmailChange }) => {

    const [newEmail, setNewEmail] = useState('');
    const [disabled, setDisabled] = useState(true);
    const newEmailInput = useRef(null);
    const newEmailErrorMessage = useRef(null);
    const navigate = useNavigate();

    const handleNewEmailChange = (e) => {
        setNewEmail(e.target.value);

        if (e.target.value === activeUser.email) {
            setDisabled(true);
        } else if (e.target.value.trim() === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }

    const handleUpdateClick = () => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (newEmail.length < 10) {
            newEmailInput.current.classList.add('input-error');
            newEmailErrorMessage.current.innerText = 'Email must be at least 10 characters.';
            newEmailErrorMessage.current.style.display = 'block';
        } else if (!regex.test(newEmail)) {
            newEmailInput.current.classList.add('input-error');
            newEmailErrorMessage.current.innerText = 'This is not a valid email address.';
            newEmailErrorMessage.current.style.display = 'block';
        } else {
            newEmailInput.current.classList.remove('input-error');
            newEmailErrorMessage.current.style.display = 'none';

            axios.post('http://localhost:5000/api/users/email', { email: newEmail })
                .then(res => {
                    if (res.status === 200) {
                        handleEmailChange(newEmail);
                        navigate(-1);
                    }
                })
                .catch(err => {
                    if (err.response.status === 406) {
                        newEmailInput.current.classList.add('input-error');
                        newEmailErrorMessage.current.innerText = 'This email address is already in use.';
                        newEmailErrorMessage.current.style.display = 'block';
                    } else {
                        newEmailInput.current.classList.remove('input-error');
                        newEmailErrorMessage.current.style.display = 'none';
                    }
                });
        }
    }

    return (
        <div className='change-email'>
            <SettingsHeader activeUser={activeUser} pageTitle={'Change email'} />
            <main className="change-email-main">
                <DesktopMenu activeUser={activeUser} page="Change Email" />
                <div className="current-email-container">
                    <label htmlFor="current-email">Current email</label>
                    <input 
                        type="email"
                        name='current-email' 
                        className='current-email' 
                        value={activeUser ? activeUser.email : ''} 
                        readOnly
                    />
                </div>
                <div className="new-email-input-container">
                    <label htmlFor="new-email">New email</label>
                    <input 
                        type="email" 
                        name='new-email'
                        className='new-email-input'
                        placeholder='Enter new email'
                        value={newEmail}
                        onChange={handleNewEmailChange}
                        ref={newEmailInput}
                    />
                    <span className="error-message" ref={newEmailErrorMessage}></span>
                </div>
                <div className="update-btn-container">
                    <button className="update-btn" disabled={disabled} onClick={handleUpdateClick}>Update Email</button>
                </div>
            </main>
            <MobileFooterMenu page={'change email'} />
        </div>
    );
}

export default ChangeEmail;
