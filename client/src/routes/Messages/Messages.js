import React from 'react';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';

const Messages = ({ activeUser }) => {
    return (
        <div>
            <MobileHeader page="Messages" activeUser={activeUser} />
            <MobileFooterMenu page="messages" />
        </div>
    );
}

export default Messages;
