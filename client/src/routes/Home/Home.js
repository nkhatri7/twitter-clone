import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.scss';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import Tweet from '../../components/Tweet/Tweet';
import TweetOptions from '../../components/TweetOptions/TweetOptions';
import Overlay from '../../components/Overlay/Overlay';
import NewTweetButton from '../../components/NewTweetButton/NewTweetButton';
import ShareTweet from '../../components/ShareTweet/ShareTweet';

const Home = ({ 
    activeUser, 
    handleLike, 
    handleUnlike, 
    handleRetweet, 
    handleRemoveRetweet, 
    handleDeleteTweet,
    handleBookmark,
    handleRemoveBookmark
}) => {

    const [tweets, setTweets] = useState([]);
    const [users, setUsers] = useState([]);
    const [optionsDisplay, setOptionsDisplay] = useState(false);
    const [tweetOptions, setTweetOptions] = useState(null);
    const [shareDisplay, setShareDisplay] = useState(false);
    const [tweetShare, setTweetShare] = useState(null);

    useEffect(() => {
        if (activeUser) {
            axios.get('http://localhost:5000/api/tweets/timeline/all', { userId: activeUser._id })
            .then(res => setTweets(res.data))
            .catch(err => console.log(err));
        }
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

    const handleTweetOptionsEvent = (tweet) => {
        setTweetOptions(tweet);
        handleOptionsView();
    }

    const handleOptionsView = () => {
        setOptionsDisplay(display => !display);
    } 

    const handleShareTweetEvent = (tweet, user) => {
        setTweetShare({tweet: tweet, user: user});
        handleShareView();
    }

    const handleShareView = () => {
        setShareDisplay(display => !display);
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
                handleTweetOptions={handleTweetOptionsEvent}
                handleShareTweet={handleShareTweetEvent}
            />
        );
    });

    return (
        <div className="home">
            <div className="home-wrapper">
                <MobileHeader page="Home" activeUser={activeUser} />
                <main className="tweets-container">
                    <div className="tweets-container">
                        {tweets.length > 0 ? tweetsDisplay : null}
                        <div className="no-more-tweets">No more tweets</div>
                    </div>
                    <NewTweetButton />
                    {optionsDisplay === false ? null :
                        <TweetOptions 
                            handleOptionsView={handleOptionsView} 
                            tweet={tweetOptions} 
                            handleDeleteTweet={handleDeleteTweet}
                        />
                    }
                    {optionsDisplay || shareDisplay ? <Overlay /> : null}
                    {shareDisplay === false ? null :
                        <ShareTweet
                            tweet={tweetShare.tweet}
                            user={tweetShare.user}
                            activeUser={activeUser}
                            handleShareView={handleShareView}
                            handleBookmark={handleBookmark}
                            handleRemoveBookmark={handleRemoveBookmark}
                        />
                    }
                </main>
                <MobileFooterMenu page="home" />
            </div>
        </div>
    );
}

export default Home;
