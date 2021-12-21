import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './DesktopMenu.scss';
import twitterLogo from '../../assets/images/twitter-logo.png';

const DesktopMenu = ({ activeUser, page }) => {

    const homeInactive = useRef(null);
    const homeActive = useRef(null);
    const homeText = useRef(null);
    const exploreInactive = useRef(null);
    const exploreActive = useRef(null);
    const exploreText = useRef(null);
    const notificationsInactive = useRef(null);
    const notificationsActive = useRef(null);
    const notificationsText = useRef(null);
    const messagesInactive = useRef(null);
    const messagesActive = useRef(null);
    const messagesText = useRef(null);
    const bookmarksInactive = useRef(null);
    const bookmarksActive = useRef(null);
    const bookmarksText = useRef(null);
    const profileInactive = useRef(null);
    const profileActive = useRef(null);
    const profileText = useRef(null);
    const settingsInactive = useRef(null);
    const settingsActive = useRef(null);
    const settingsText = useRef(null);

    const navigate = useNavigate();

    const inactiveIcons = [homeInactive, exploreInactive, notificationsInactive, messagesInactive, bookmarksInactive, 
        profileInactive, settingsInactive];
    const activeIcons = [homeActive, exploreActive, notificationsActive, messagesActive, bookmarksActive,
        profileActive, settingsActive];
    const linksText = [homeText, exploreText, notificationsText, messagesText, bookmarksText, profileText, settingsText];

    useEffect(() => {
        inactiveIcons.forEach(icon => {
            icon.current.dataset.page === page ? icon.current.style.opacity = 0 : icon.current.style.opacity = 1;
        });
        activeIcons.forEach(icon => {
            icon.current.dataset.page === page ? icon.current.style.opacity = 1 : icon.current.style.opacity = 0;
        });
        linksText.forEach(text => {
            text.current.dataset.page === page ? text.current.style.fontWeight = 700 : text.current.style.fontWeight = 500;
        });
    });

    return (
        <div className='desktop-menu'>
            <img src={twitterLogo} alt="Twitter Logo" className="twitter-logo" />
            <nav>
                <ul>
                    <li className="desktop-menu-link-container">
                        <Link to='/home' aria-label='Go to homepage' className='desktop-menu-link'>
                            <div className="svg-container">
                                <svg ref={homeInactive} data-page='Home' xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <svg ref={homeActive} data-page='Home' xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                            </div>
                            <span ref={homeText} data-page='Home' className="desktop-link-text">Home</span>
                        </Link>
                    </li>
                    <li className="desktop-menu-link-container">
                        <Link to='/explore' aria-label='Go to explore page' className='desktop-menu-link'>
                            <div className="svg-container">
                                <svg ref={exploreInactive} data-page="Explore" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <svg ref={exploreActive} data-page="Explore" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <span ref={exploreText} data-page="Explore" className="desktop-link-text">Explore</span>
                        </Link>
                    </li>
                    <li className="desktop-menu-link-container">
                        <Link to='/notifications' aria-label='Go to notifications' className='desktop-menu-link'>
                            <div className="svg-container">
                                <svg ref={notificationsInactive} data-page="Notifications" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <svg ref={notificationsActive} data-page="Notifications" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                    <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                </svg>
                            </div>
                            <span ref={notificationsText} data-page="Notifications" className="desktop-link-text">Notifications</span>
                        </Link>
                    </li>
                    <li className="desktop-menu-link-container">
                        <Link to='/messages' aria-label='Go to messages' className='desktop-menu-link'>
                            <div className="svg-container">
                                <svg ref={messagesInactive} data-page="Messages" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <svg ref={messagesActive} data-page="Messages" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </div>
                            <span ref={messagesText} data-page="Messages" className="desktop-link-text">Messages</span>
                        </Link>
                    </li>
                    <li className="desktop-menu-link-container">
                        <Link to={`/${activeUser ? activeUser.username : ''}/bookmarks`} aria-label='Go to bookmarks' className='desktop-menu-link'>
                            <div className="svg-container">
                                <svg ref={bookmarksInactive} data-page="Bookmarks" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                                <svg ref={bookmarksActive} data-page="Bookmarks" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                </svg>
                            </div>
                            <span ref={bookmarksText} data-page="Bookmarks" className="desktop-link-text">Bookmarks</span>
                        </Link>
                    </li>
                    <li className="desktop-menu-link-container">
                        <Link to={`/${activeUser ? activeUser.username : ''}`} aria-label='Go to profile' className='desktop-menu-link'>
                            <div className="svg-container">
                                <svg ref={profileInactive} data-page="Profile" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <svg ref={profileActive} data-page="Profile" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span ref={profileText} data-page="Profile" className="desktop-link-text">Profile</span>
                        </Link>
                    </li>
                    <li className="desktop-menu-link-container">
                        <Link to='/settings' aria-label='Go to settings' className='desktop-menu-link'>
                            <div className="svg-container">
                                <svg ref={settingsInactive} data-page="Settings" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <svg ref={settingsActive} data-page="Settings" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <span ref={settingsText} data-page="Settings" className="desktop-link-text">Settings</span>
                        </Link>
                    </li>
                </ul>
            </nav>
            <button className="tweet-btn" onClick={() => navigate('/compose/tweet')}>Tweet</button>
            <button className="tablet-tweet-btn" onClick={() => navigate('/compose/tweet')}>+</button>
        </div>
    );
}

export default DesktopMenu;
