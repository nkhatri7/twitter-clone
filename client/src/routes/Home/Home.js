import React, { useEffect } from 'react';
import './Home.scss';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';

const Home = ({ activeUser }) => {

    useEffect(() => {
        console.log(activeUser)
    }, [activeUser]);

    return (
        <div className="home">
            <div className="home-wrapper">
                <MobileFooterMenu page="home" />
            </div>
        </div>
    );
}

export default Home;
