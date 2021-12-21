import React from 'react';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';

const Messages = ({ activeUser }) => {
    return (
        <div>
            <MobileHeader page="Messages" activeUser={activeUser} />
            <DesktopMenu activeUser={activeUser} page="Messages" />
            <MobileFooterMenu page="messages" />
        </div>
    );
}

export default Messages;
