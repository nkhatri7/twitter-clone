import React from 'react';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';

const Explore = ({ activeUser }) => {
    return (
        <div>
            <MobileHeader page="Explore" activeUser={activeUser} />
            <MobileFooterMenu page="explore" />
        </div>
    );
}

export default Explore;
