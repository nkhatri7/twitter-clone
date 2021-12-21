import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DeactivateAccount.scss';
import profilePic from '../../assets/images/default-profile-pic.png';
import axios from 'axios';
import SettingsHeader from '../../components/SettingsHeader/SettingsHeader';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const DeactivateAccount = ({ activeUser, handleDeactivateAccount }) => {

    const [deactivateClicked, setDeactivateClicked] = useState(false);
    const [password, setPassword] = useState('');
    const passwordInput = useRef(null);
    const passwordErrorMessage = useRef(null);
    const navigate = useNavigate();

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    const handleDeactivate = () => {
        axios.post(`http://localhost:5000/api/users/password/${activeUser._id}`, { password: password })
            .then(res => {
                const tweets = [];
                if (activeUser.tweets.length > 0) {
                    activeUser.tweets.forEach((tweetId, index, array) => {
                        axios.get(`http://localhost:5000/api/tweets/${tweetId}`)
                            .then(res => {
                                tweets.push(res.data);
                                console.log(tweets);
                                if (index === (array.length - 1)) {
                                    deleteTweets(tweets);
                                    handleDeactivateAccount();
                                    navigate('/');
                                }
                            })
                            .catch(err => console.log(err));
                    });
                }
            })
            .catch(err => {
                if (err.response.status === 406) {
                    passwordInput.current.classList.add('input-error');
                    passwordErrorMessage.current.style.display = 'block';
                } else {
                    passwordInput.current.classList.remove('input-error');
                    passwordErrorMessage.current.style.display = 'none';
                    console.log(err);
                }
            });
    }

    const deleteTweets = (tweets) => {
        tweets.forEach(tweet => {
            if (tweet.reply) {
                axios.delete(`http://localhost:5000/api/tweets/${tweet.replyTo}/delete/${tweet._id}`)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            } else {
                axios.delete(`http://localhost:5000/api/tweets/${tweet._id}`)
                    .then(res => console.log(res))
                    .then(err => console.log(err));
            }
        });
    }

    return (
        <div className='deactivate-account'>
            <SettingsHeader 
                activeUser={activeUser} 
                pageTitle={deactivateClicked ? 'Confirm your password' : 'Deactivate Account'} 
            />
            {deactivateClicked === false ? 
                <main className="deactivate-account-main">
                    <DesktopMenu activeUser={activeUser} page="Deactivate Account" />
                    <div className="profile-container" onClick={() => navigate(`/${activeUser.username}`)}>
                        <img src={profilePic} alt="" className="profile-pic" />
                        <div className="profile-details">
                            <span className="profile-display-name">{activeUser ? activeUser.displayName : ''}</span>
                            <span className="profile-username">@{activeUser ? activeUser.username : ''}</span>
                        </div>
                    </div>
                    <div className="deactivate-account-description">
                        <h2>This will deactivate your account</h2>
                        <p className="description">You're about to start the process of deactivating your Twitter account. Your display name, @username, and public profile will no longer be viewable on Twitter.com, Twitter for iOS, or Twitter for Android.</p>
                    </div>
                    <div className="deactivate-account-warnings">
                        <h2>What else you should know</h2>
                        <div className="description-container">
                            <span className="description">
                                Some account information may still be available in search engines, such as Google or Bing.&nbsp;
                                <a href="https://help.twitter.com/en/safety-and-security/remove-twitter-profile-from-google-search" className="deactivate-description-link" target="_blank" rel='noreferrer'>Learn more</a>
                            </span>
                        </div>
                        <div className="description-container">
                            <span className="description">
                                If you just want to change your @username, you don't need to deactivate your account – edit it in your&nbsp;
                                <Link to={'/settings/your_twitter_data/account'} className='deactivate-description-link'>settings</Link>.
                            </span>
                        </div>
                        <div className="description-container">
                            <span className="description">
                                To use your current @username or email address with a different Twitter account,&nbsp;
                                <Link to={'/settings/your_twitter_data/account'} className='deactivate-description-link'>change them</Link>
                                &nbsp;before you deactivate this account.
                            </span>
                        </div>
                    </div>
                    <div className="deactivate-btn-container">
                        <button className="deactivate-btn" onClick={() => setDeactivateClicked(true)}>Deactivate</button>
                    </div>
                </main>
                :
                <main className="deactivate-account-main">
                    <DesktopMenu activeUser={activeUser} page="Deactivate Account" />
                    <h2>Confirm your password</h2>
                    <div className="description-container">
                        <span className="description">
                            Complete your deactivation request by entering the password associated with your account.
                        </span>
                    </div>
                    <div className="deactivate-password-container">
                        <input 
                            type="password"
                            className='deactivate-password-input'
                            placeholder='Password'
                            value={password}
                            onChange={handlePasswordChange}
                            ref={passwordInput}
                        />
                        <span className="error-message" ref={passwordErrorMessage}>The password you entered was incorrect</span>
                        <Link to={'/forgot-password'} className='deactivate-description-link'>Forgot password?</Link>
                    </div>
                    <div className="deactivate-confirmation-btn-container">
                        <button className="deactivate-confirmation-btn" onClick={handleDeactivate}>Deactivate</button>
                    </div>
                </main>
            }
            <MobileFooterMenu page={'deactivate account'} />
        </div>
    );
}

export default DeactivateAccount;
