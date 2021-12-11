import React, { useState, useEffect, useRef } from 'react';
import MobileMenu from '../MobileMenu/MobileMenu';
import './MobileHeader.scss';

const MobileHeader = ({ page, activeUser }) => {

    const [menuOpen, setMenuOpen] = useState(false);
    const menuContainer = useRef(null);
    const overlay = useRef(null);

    const handleMobileMenuToggle = () => {
        setMenuOpen(menuOpen => !menuOpen);
    }

    useEffect(() => {
        if (menuOpen) {
            menuContainer.current.classList.add('menu-open');
            overlay.current.classList.add('overlay-active');
        } else {
            menuContainer.current.classList.remove('menu-open');
            overlay.current.classList.remove('overlay-active');
        }
    }, [menuOpen]);

    return (
        <div className="mobile-header-menu-container">
            <header>
                <button className="header-profile-pic" aria-label="Open menu" onClick={handleMobileMenuToggle}>
                    <span className="hidden">MENU</span>
                </button>
                <h1>{page}</h1>
            </header>
            <div className="mobile-menu-container" ref={menuContainer}>
                <MobileMenu handleMobileMenuToggle={handleMobileMenuToggle} activeUser={activeUser} />
            </div>
            <div className="overlay" ref={overlay}></div>
        </div>
    );
}

export default MobileHeader;
