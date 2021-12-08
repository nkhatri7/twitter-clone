import React, { useEffect } from 'react';
import './Home.scss';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';

const Home = ({ activeUser }) => {

    useEffect(() => {
        console.log(activeUser)
    }, [activeUser]);

    return (
        <div className="home">
            <div className="home-wrapper">
                <MobileHeader page="Home" activeUser={activeUser} />
                <MobileFooterMenu page="home" />
            </div>
        </div>
    );
}

export default Home;
