import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './ChangePassword.scss';
import SettingsHeader from '../../components/SettingsHeader/SettingsHeader';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const ChangePassword = ({ activeUser, handleChangePassword }) => {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [disabled, setDisabled] = useState(true);
    const navigate = useNavigate();

    const currentPasswordInput = useRef(null);
    const currentPasswordErrorMessage = useRef(null);
    const newPasswordInput = useRef(null);
    const newPasswordErrorMessage = useRef(null);
    const confirmedPasswordInput = useRef(null);
    const confirmedPasswordErrorMessage = useRef(null);

    useEffect(() => {
        currentPassword.trim() && newPassword.trim() && confirmedPassword.trim() ? setDisabled(false) : setDisabled(true);
    }, [currentPassword, newPassword, confirmedPassword]);

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    }

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    }

    const handleConfirmedPasswordChange = (e) => {
        setConfirmedPassword(e.target.value);
    }

    const handleSaveEvent = () => {
        if (newPassword !== confirmedPassword) {
            confirmedPasswordInput.current.classList.add('input-error');
            confirmedPasswordErrorMessage.current.style.display = 'block';
        } else {
            confirmedPasswordInput.current.classList.remove('input-error');
            confirmedPasswordErrorMessage.current.style.display = 'none';

            if (newPassword.length < 8) {
                newPasswordInput.current.classList.add('input-error');
                newPasswordErrorMessage.current.innerText = 'Password must be at least 8 characters';
                newPasswordErrorMessage.current.style.display = 'block';
            } else if (newPassword === currentPassword) {
                newPasswordInput.current.classList.add('input-error');
                newPasswordErrorMessage.current.innerText = 'New password cannot be the same as current password';
                newPasswordErrorMessage.current.style.display = 'block';
            } else {
                newPasswordInput.current.classList.remove('input-error');
                newPasswordErrorMessage.current.style.display = 'none';

                // Check if current password is valid
                axios.post(`http://localhost:5000/api/users/password/${activeUser._id}`, { password: currentPassword })
                    .then(res => {
                        if (res.status === 200) {
                            handleChangePassword(newPassword);
                            navigate('/home');
                        }
                    })
                    .catch(err => {
                        if (err.response.status === 406) {
                            currentPasswordInput.current.classList.add('input-error');
                            currentPasswordErrorMessage.current.style.display = 'block';
                        } else {
                            console.log(err);
                            currentPasswordInput.current.classList.remove('input-error');
                            currentPasswordErrorMessage.current.style.display = 'none';
                        }
                    });
            }
        }
    }

    return (
        <div className='change-password'>
            <SettingsHeader activeUser={activeUser} pageTitle={'Change your password'} />
            <main className="change-password-main">
                <DesktopMenu activeUser={activeUser} page="Change Password" />
                <div className="change-password-input-container current-password-container">
                    <input 
                        type="password" 
                        className='change-password-input' 
                        placeholder='Current password' 
                        value={currentPassword} 
                        onChange={handleCurrentPasswordChange}
                        ref={currentPasswordInput}
                    />
                    <span className="error-message" ref={currentPasswordErrorMessage}>The password you entered was incorrect</span>
                    <Link to={'/forgot-password'} className='change-password-link'>Forgot password?</Link>
                </div>
                <div className="update-password-container">
                    <div className="change-password-input-container">
                        <input 
                            type="password" 
                            className='change-password-input'
                            placeholder='New password'
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            ref={newPasswordInput}
                        />
                        <span className="error-message" ref={newPasswordErrorMessage}></span>
                    </div>
                    <div className="change-password-input-container">
                        <input 
                            type="password"
                            className='change-password-input'
                            placeholder='Confirm password'
                            value={confirmedPassword}
                            onChange={handleConfirmedPasswordChange}
                            ref={confirmedPasswordInput}
                        />
                        <span className="error-message" ref={confirmedPasswordErrorMessage}>Passwords do not match</span>
                    </div>
                </div>
                <div className="save-btn-container">
                    <button className="change-password-save-btn" disabled={disabled} onClick={handleSaveEvent}>Save</button>
                </div>
            </main>
            <MobileFooterMenu page={'change password'} />
        </div>
    );
}

export default ChangePassword;
