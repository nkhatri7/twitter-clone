import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SettingsHeader from '../../components/SettingsHeader/SettingsHeader';
import './ChangeUsername.scss';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const ChangeUsername = ({ activeUser, handleUsernameChange }) => {

    const [username, setUsername] = useState(activeUser ? activeUser.username : '');
    const [disabled, setDisabled] = useState(true);
    const usernameInput = useRef(null);
    const usernameErrorMessage = useRef(null);
    const navigate = useNavigate();

    const handleUsernameInputChange = (e) => {
        setUsername(e.target.value);

        if (e.target.value.length < 3) {
            usernameInput.current.classList.add('input-error');
            usernameErrorMessage.current.innerText = 'Your username must be at least 3 characters.';
            usernameErrorMessage.current.style.display = 'block';
            setDisabled(true);
        } else if (e.target.value.length > 25) {
            usernameInput.current.classList.add('input-error');
            usernameErrorMessage.current.innerText = 'Your username cannot be longer than 25 characters.';
            usernameErrorMessage.current.style.display = 'block';
            setDisabled(true);
        } else {
            usernameInput.current.classList.remove('input-error');
            usernameErrorMessage.current.style.display = 'none';
            e.target.value === activeUser.username ? setDisabled(true) : setDisabled(false);
        }
    }

    const handleSaveClick = () => {
        axios.post('http://localhost:5000/api/users/username', { username: username })
            .then(res => {
                if (res.status === 200) {
                    handleUsernameChange(username);
                    navigate(-1);
                }
            })
            .catch(err => {
                if (err.response.status === 406) {
                    usernameInput.current.classList.add('input-error');
                    usernameErrorMessage.current.innerText = 'That username has been taken. Please choose another.';
                    usernameErrorMessage.current.style.display = 'block';
                } else {
                    usernameInput.current.classList.remove('input-error');
                    usernameErrorMessage.current.style.display = 'none';
                }
            });
    }

    return (
        <div className='change-username'>
            <SettingsHeader activeUser={activeUser} pageTitle={'Change username'} />
            <main className="change-username-main">
                <DesktopMenu activeUser={activeUser} page="Change Username" />
                <div className="change-username-input-container">
                    <label htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name='username' 
                        className='change-username-input' 
                        value={username} 
                        onChange={handleUsernameInputChange} 
                        ref={usernameInput} 
                    />
                    <span className="error-message" ref={usernameErrorMessage}></span>
                </div>
                <div className="save-btn-container">
                    <button className="save-btn" disabled={disabled} onClick={handleSaveClick}>Save</button>
                </div>
            </main>
            <MobileFooterMenu page={'change username'} />
        </div>
    );
}

export default ChangeUsername;
