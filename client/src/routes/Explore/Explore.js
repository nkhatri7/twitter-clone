import React from 'react';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';

const Explore = ({ activeUser }) => {
    return (
        <div>
            <MobileHeader page="Explore" activeUser={activeUser} />
            <DesktopMenu activeUser={activeUser} page="Explore" />
            <MobileFooterMenu page="explore" />
        </div>
    );
}

export default Explore;
