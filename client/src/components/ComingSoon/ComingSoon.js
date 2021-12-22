import React from 'react';
import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../MobileFooterMenu/MobileFooterMenu';
import './ComingSoon.scss';

const ComingSoon = ({ activeUser }) => {
    return (
        <div className='coming-soon'>
            <main className='coming-soon-main'>
                <DesktopMenu activeUser={activeUser} />
                <div className="coming-soon-content">
                    <h1>Coming soon</h1>
                    <h2>Page doesn't exist yet</h2>
                    <p>I might add it eventually (...or not)</p>
                    <span className="siu">SIUUUUUUUUUUUU</span>
                </div>
            </main>
            <MobileFooterMenu page="Not Found" />
        </div>
    );
}

export default ComingSoon;
