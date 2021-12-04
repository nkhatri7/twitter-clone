import React, { useEffect } from 'react';

const Home = ({ activeUser }) => {

    useEffect(() => {
        console.log(activeUser)
    }, [activeUser]);

    return (
        <div>
            
        </div>
    );
}

export default Home;
