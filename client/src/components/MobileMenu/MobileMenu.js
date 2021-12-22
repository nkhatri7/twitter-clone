import React from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './MobileMenu.scss';
import profilePic from '../../assets/images/default-profile-pic.png';

const MobileMenu = ({ handleMobileMenuToggle, activeUser }) => {

    const navigate = useNavigate();

    const handleProfileClick = () => {
        navigate(`/${activeUser.username}`);
    }

    return (
        <div className="mobile-menu">
            <div className="menu-header">
                <span className="account-info">Account Info</span>
                <button className="close-menu" aria-label="Close menu" onClick={handleMobileMenuToggle}>
                    <span className="hidden">Close</span>
                </button>
            </div>
            <div className="mobile-menu-main">
                <div className="account-details">
                    <div className="mobile-menu-profile-link" onClick={handleProfileClick}>
                        <img src={profilePic} alt="" className="mobile-menu-profile-pic" />
                        <span className="menu-display-name">{activeUser ? activeUser.displayName : ''}</span>
                        <span className="menu-username">@{activeUser ? activeUser.username : ''}</span>
                    </div>
                    <div className="mobile-menu-network-container">
                        <p className="mobile-menu-network-detail" onClick={() => navigate(`/${activeUser.username}/following`)}>
                            {activeUser ? activeUser.following.length : ''}
                            <span>Following</span>
                        </p>
                        <p className="mobile-menu-network-detail" onClick={() => navigate(`/${activeUser.username}/followers`)}>
                            {activeUser ? activeUser.followers.length : ''}
                            <span>Followers</span>
                        </p>
                    </div>
                </div>
                <div className="mobile-menu-links-container">
                    <ul>
                        <li className="mobile-menu-link-container">
                            <Link to={`/${activeUser ? activeUser.username : ''}`} className="mobile-menu-link">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span>Profile</span>
                            </Link>
                        </li>
                        <li className="mobile-menu-link-container">
                            <Link to={`/${activeUser ? activeUser.username : ''}/lists`} className="mobile-menu-link">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Lists</span>
                            </Link>
                        </li>
                        <li className="mobile-menu-link-container">
                            <Link to={`/${activeUser ? activeUser.username : ''}/topics`} className="mobile-menu-link">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                <span>Topics</span>
                            </Link>
                        </li>
                        <li className="mobile-menu-link-container">
                            <Link to={`/${activeUser ? activeUser.username : ''}/bookmarks`} className="mobile-menu-link">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <span>Bookmarks</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="mobile-menu-footer">
                <div className="mobile-menu-links-container">
                    <ul>
                        <li className="mobile-menu-link-container">
                            <Link to="/settings" className="mobile-menu-link">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span>Settings and Privacy</span>
                            </Link>
                        </li>
                        <li className="mobile-menu-link-container">
                            <a href="https://help.twitter.com/en" target="_blank" rel="noreferrer" className="mobile-menu-link">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>Help Center</span>
                            </a>
                        </li>
                        <li className="mobile-menu-link-container">
                            <Link to="/" className="mobile-menu-link">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Log Out</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MobileMenu;
