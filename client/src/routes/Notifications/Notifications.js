import React from 'react';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';

const Notifications = ({ activeUser }) => {
    return (
        <div>
            <MobileHeader page="Notifications" activeUser={activeUser} />
            <MobileFooterMenu page="notifications" />
        </div>
    );
}

export default Notifications;
