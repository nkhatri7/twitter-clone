import React from 'react';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';

const Notifications = ({ activeUser }) => {
    return (
        <div>
            <MobileHeader page="Notifications" activeUser={activeUser} />
            <DesktopMenu activeUser={activeUser} page="Notifications" />
            <MobileFooterMenu page="notifications" />
        </div>
    );
}

export default Notifications;
