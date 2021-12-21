import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileSettings.scss';
import profilePic from '../../assets/images/default-profile-pic.png';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const ProfileSettings = ({ activeUser, handleUpdateProfile }) => {

    const [name, setName] = useState(activeUser ? activeUser.displayName : '');
    const [bio, setBio] = useState(activeUser ? activeUser.bio : '');
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const nameInput = useRef(null);
    const nameErrorMessage = useRef(null);
    const bioInput = useRef(null);
    const bioErrorMessage = useRef(null);

    const handleNameChange = (e) => {
        setName(e.target.value);

        if (e.target.value === '') {
            nameErrorMessage.current.innerText = 'Name cannot be empty';
            nameErrorMessage.current.style.display = 'block';
            nameInput.current.classList.add('input-error');
            setDisabled(true);
        } else if (e.target.value.length > 25) {
            nameErrorMessage.current.innerText = 'Name cannot be more than 25 characters';
            nameErrorMessage.current.style.display = 'block';
            nameInput.current.classList.add('input-error');
            setDisabled(true);
        } else {
            nameErrorMessage.current.style.display = 'none';
            nameInput.current.classList.remove('input-error');
            setDisabled(false);
        }
    }

    const handleBioChange = (e) => {
        setBio(e.target.value);

        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        if (e.target.value.length > 100) {
            bioErrorMessage.current.style.display = 'block';
            bioInput.current.classList.add('input-error');
            setDisabled(true);
        } else {
            bioErrorMessage.current.style.display = 'none';
            bioInput.current.classList.remove('input-error');
            setDisabled(false);
        }
    }

    const handleSave = () => {
        handleUpdateProfile(name.trim(), bio.trim());
        navigate(-1);
    }

    return (
        <div className='profile-settings'>
            <header className='profile-settings-header'>
                <div className="profile-settings-header-main">
                    <button className="back" aria-label='Go back' onClick={() => navigate(-1)}>
                        <span className="hidden">Back</span>
                    </button>
                    <h1>Edit profile</h1>
                </div>
                <button className="profile-settings-save-btn" onClick={handleSave} disabled={disabled}>Save</button>
            </header>
            <main className="profile-settings-main">
                <DesktopMenu activeUser={activeUser} page="Profile Settings" />
                <div className="cover-image-container">
                    <div className="cover-image"></div>
                    <div className="cover-image-actions">
                        <button className="change-image" aria-label='Change cover image'>
                            <span className="hidden">Change</span>
                        </button>
                        <button className="remove-image" aria-label='Remove cover image'>
                            <span className="hidden">Remove</span>
                        </button>
                    </div>
                </div>
                <div className="profile-image-container">
                    <img src={profilePic} alt="" className="profile-image" />
                    <div className="profile-image-actions">
                        <button className="change-image" aria-label='Change profile picture'>
                            <span className="hidden">Change</span>
                        </button>
                    </div>
                </div>
                <div className="profile-main-details">
                    <div className="input-container">
                        <label htmlFor="name" className='input-label'>Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            className='profile-settings-input' 
                            value={name} 
                            onChange={handleNameChange}
                            ref={nameInput}
                        />
                        <span className="error-message" ref={nameErrorMessage}></span>
                    </div>
                    <div className="input-container">
                        <label htmlFor="bio" className='input-label'>Bio</label>
                        <textarea 
                            name="bio" 
                            className='profile-settings-input profile-settings-bio'
                            value={bio}
                            onChange={handleBioChange}
                            ref={bioInput}
                        />
                        <span className="error-message" ref={bioErrorMessage}>Bio cannot be more than 100 characters</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ProfileSettings;
