import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './MobileFooterMenu.scss';

const MobileFooterMenu = ({ page }) => {

    const homeInactive = useRef(null);
    const homeActive = useRef(null);
    const exploreInactive = useRef(null);
    const exploreActive = useRef(null);
    const notificationsInactive = useRef(null);
    const notificationsActive = useRef(null);
    const messagesInactive = useRef(null);
    const messagesActive = useRef(null);

    const inactiveIcons = [homeInactive, exploreInactive, notificationsInactive, messagesInactive];
    const activeIcons = [homeActive, exploreActive, notificationsActive, messagesActive];

    useEffect(() => {
        inactiveIcons.forEach(icon => {
            icon.current.dataset.page === page ? icon.current.style.opacity = 0 : icon.current.style.opacity = 1;
        });
        activeIcons.forEach(icon => {
            icon.current.dataset.page === page ? icon.current.style.opacity = 1 : icon.current.style.opacity = 0;
        });
    });

    return (
        <footer className="mobile-footer-menu">
            <nav>
                <ul>
                    <li>
                        <Link to='/home' aria-label='Link to homepage' className="mobile-footer-link">
                            <svg ref={homeInactive} data-page="home" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <svg ref={homeActive} data-page="home" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to='/explore' aria-label='Link to explore page' className="mobile-footer-link">
                            <svg ref={exploreInactive} data-page="explore" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <svg ref={exploreActive} data-page="explore" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to='/notifications' aria-label='Link to notifications page' className="mobile-footer-link">
                            <svg ref={notificationsInactive} data-page="notifications" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <svg ref={notificationsActive} data-page="notifications" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                            </svg>
                        </Link>
                    </li>
                    <li>
                        <Link to='/messages' aria-label='Link to messages-page' className="mobile-footer-link">
                            <svg ref={messagesInactive} data-page="messages" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#FFF">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <svg ref={messagesActive} data-page="messages" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="#FFF">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                        </Link>
                    </li>
                </ul>
            </nav>
        </footer>
    );
}

export default MobileFooterMenu;
