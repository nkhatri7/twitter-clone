import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import Tweet from '../../components/Tweet/Tweet';

const Home = ({ activeUser }) => {

    const [tweets, setTweets] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/tweets/timeline/all', { userId: activeUser._id })
            .then(res => setTweets(res.data))
            .catch(err => console.log(err));
    }, [activeUser]);

    useEffect(() => {
        const allUsers = [];
        tweets.forEach(tweet => {
            axios.get(`http://localhost:5000/api/users/${tweet.userId}`)
                .then(res => {
                    allUsers.push(res.data);
                    // Adapted from @Arun Saini https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
                    const uniqueUsers = [...new Map(allUsers.map(user => [user['username'], user])).values()];
                    setUsers(uniqueUsers);
                })
                .catch(err => console.log(err));
        });
    }, [tweets]);

    const tweetsDisplay = tweets.map(tweet => {
        const user = users.find(user => user._id === tweet.userId);

        return (
            <Tweet 
                key={tweet._id}
                tweet={tweet}
                user={user ? user : {}}
                activeUser={activeUser}
            />
        );
    });

    return (
        <div className="home">
            <div className="home-wrapper">
                <MobileHeader page="Home" activeUser={activeUser} />
                <div className="tweets-container">
                    {tweets.length > 0 ? tweetsDisplay : null}
                </div>
                <MobileFooterMenu page="home" />
            </div>
        </div>
    );
}

export default Home;
