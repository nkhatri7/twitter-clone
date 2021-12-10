import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './Home.scss';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import Tweet from '../../components/Tweet/Tweet';

const Home = ({ activeUser, handleLike, handleUnlike, handleRetweet, handleRemoveRetweet }) => {

    const [tweets, setTweets] = useState([]);
    const [users, setUsers] = useState([]);

    const navigate = useNavigate();

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

    const handleNewTweetNavigation = () => {
        navigate('/compose/tweet');
    }

    const sortedTweets = tweets.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const tweetsDisplay = sortedTweets.map(tweet => {
        const user = users.find(user => user._id === tweet.userId);

        return (
            <Tweet 
                key={tweet._id}
                tweet={tweet}
                user={user ? user : {}}
                activeUser={activeUser}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
                handleRetweet={handleRetweet}
                handleRemoveRetweet={handleRemoveRetweet}
            />
        );
    });

    return (
        <div className="home">
            <div className="home-wrapper">
                <MobileHeader page="Home" activeUser={activeUser} />
                <main className="tweets-container">
                    {tweets.length > 0 ? tweetsDisplay : null}
                    <div className="no-more-tweets">No more tweets</div>
                </main>
                <button 
                    className="new-tweet-btn" 
                    aria-label="New tweet" 
                    onClick={handleNewTweetNavigation}
                >+</button>
                <MobileFooterMenu page="home" />
            </div>
        </div>
    );
}

export default Home;
