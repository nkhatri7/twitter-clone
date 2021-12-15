import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.scss';
import profilePic from '../../assets/images/default-profile-pic.png';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import NewTweetButton from '../../components/NewTweetButton/NewTweetButton';
import Tweet from '../../components/Tweet/Tweet';
import TweetOptions from '../../components/TweetOptions/TweetOptions';
import Overlay from '../../components/Overlay/Overlay';

const Profile = ({ 
    activeUser, 
    handleLike, 
    handleUnlike, 
    handleRetweet, 
    handleRemoveRetweet, 
    handleDeleteReply, 
    handleDeleteTweet 
}) => {

    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [likedTweets, setLikedTweets] = useState(null);
    const [likedTweetsUsers, setLikedTweetsUsers] = useState(null);
    const [optionsDisplay, setOptionsDisplay] = useState(false);
    const [tweetOptions, setTweetOptions] = useState(null);

    const tweetTab = useRef(null);
    const repliesTab = useRef(null);
    const mediaTab = useRef(null);
    const likesTab = useRef(null);
    const [activeTab, setActiveTab] = useState(tweetTab);

    const profileMainContainer = useRef(null);
    const tweetsContainer = useRef(null);

    useEffect(() => {
        if (username !== activeUser.username) {
            axios.get(`http://localhost:5000/api/users/username/${username}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err));
        } else {
            setUser(activeUser);
        }
    }, [username, activeUser]);

    useEffect(() => {
        if (user) {
            const userTweets = user.tweets;
            if (userTweets.length > 0) {
                const allTweets = [];
                userTweets.forEach(tweetId => {
                    axios.get(`http://localhost:5000/api/tweets/${tweetId}`)
                        .then(res => {
                            allTweets.push(res.data);
                            setTweets(allTweets);
                        })
                        .catch(err => console.log(err));
                });
            }
        
            const userLikes = user.likes;
            if (userLikes.length > 0) {
                const allLikedTweets = [];
                userLikes.forEach(tweetId => {
                    axios.get(`http://localhost:5000/api/tweets/${tweetId}`)
                        .then(res => {
                            allLikedTweets.push(res.data);
                            setLikedTweets(allLikedTweets);
                        })
                        .catch(err => console.log(err));
                });
            }
        }
    }, [user]);

    useEffect(() => {
        if (likedTweets) {
            const allLikedTweetsUsers = [];
            likedTweets.forEach(tweet => {
                axios.get(`http://localhost:5000/api/users/${tweet.userId}`)
                    .then(res => {
                        allLikedTweetsUsers.push(res.data);
                        const uniqueUsers = [...new Map(allLikedTweetsUsers.map(user => [user['username'], user])).values()];
                        setLikedTweetsUsers(uniqueUsers);
                    })
                    .catch(err => console.log(err));
            });
        }
    }, [likedTweets]);

    useEffect(() => {
        const tabs = [tweetTab, repliesTab, mediaTab, likesTab];
        tabs.forEach(tab => tab === activeTab ? tab.current.classList.add('active-tab') : tab.current.classList.remove('active-tab'));
    }, [activeTab]);

    const getJoinedDate = () => {
        const creationDate = new Date(user.createdAt);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 
            'October', 'November', 'December'];
        return `${months[creationDate.getMonth()]} ${creationDate.getFullYear()}`;
    }

    const handleTweetOptionsEvent = (tweet) => {
        setTweetOptions(tweet);
        handleOptionsView();
    }

    const handleOptionsView = () => {
        setOptionsDisplay(display => !display);
    }

    const filterTweets = () => {
        if (tweets && likedTweets) {
            if (activeTab === tweetTab) {
                return tweets.filter(tweet => tweet.reply === false);
            } else if (activeTab === repliesTab) {
                return tweets;
            } else if (activeTab === mediaTab) {
                return [];
            } else if (activeTab === likesTab) {
                return likedTweets;
            }
        }
    }

    const getTweetsDisplay = () => {
        if (tweets && likedTweets) {
            getTweetContainerPosition();
            const tweetsDisplay = filterTweets().map(tweet => {
                let likedTweetUser = {};
                if (activeTab === likesTab) {
                    likedTweetUser = likedTweetsUsers.find(user => user._id === tweet.userId);
                }
        
                return (
                    <Tweet
                        key={tweet._id}
                        tweet={tweet}
                        user={activeTab === likesTab ? likedTweetUser : activeUser}
                        activeUser={activeUser}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                        handleRetweet={handleRetweet}
                        handleRemoveRetweet={handleRemoveRetweet}
                        handleTweetOptions={handleTweetOptionsEvent}
                    />
                );
            });
            return tweetsDisplay;
        }
    }

    const getTweetContainerPosition = () => {
        tweetsContainer.current.style.top = `${profileMainContainer.current.offsetHeight + 51}px`;
    }

    return (
        <div className='profile'>
            <header className='profile-header'>
                <button className="back-btn" aria-label='Go back' onClick={() => navigate(-1)}>
                    <span className='hidden'>Back</span>
                </button>
                <div className="profile-header-user-details">
                    <span className="profile-header-user-name">{user ? user.displayName : ''}</span>
                    <span className="profile-header-tweet-count">{user ? `${user.tweets.length} Tweets` : ''}</span>
                </div>
            </header>
            <main className="profile-main">
                <div className="profile-main-container" ref={profileMainContainer}>
                    <div className="profile-cover-photo"></div>
                    <div className="profile-details">
                        <div className="profile-details-header">
                            <img src={profilePic} alt="" className="profile-pic" />
                            {
                                user === null ? null 
                                    : (user._id === activeUser._id) ?
                                        <button className="edit-account-btn">Edit profile</button> 
                                    : 
                                        <button 
                                            className={
                                                `follow-btn ${activeUser.following.includes(user._id) ? `following` : `follow`}`
                                            }
                                        >
                                        {activeUser.following.includes(user._id) ? 'Following' : 'Follow'}
                                        </button>
                            }
                        </div>
                        <span className="profile-display-name">{user ? user.displayName : ''}</span>
                        <span className="profile-username">@{user ? user.username : ''}</span>
                        { user === null ? null : (user.bio) ? <span className="profile-bio">{user.bio}</span> : null }
                        <div className="joined-date">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>Joined {user ? getJoinedDate() : ''}</span>
                        </div>
                        <div className="profile-network-container">
                            <div className="profile-network">
                                <span className="profile-network-number">{user ? user.following.length : ''}</span>
                                Following
                            </div>
                            <div className="profile-network">
                                <span className="profile-network-number">{user ? user.followers.length : ''}</span>
                                Followers
                            </div>
                        </div>
                    </div>
                    <div className="profile-tabs">
                        <button 
                            className="profile-tab" 
                            ref={tweetTab} 
                            onClick={() => setActiveTab(tweetTab)}
                        >Tweets</button>
                        <button 
                            className="profile-tab" 
                            ref={repliesTab}
                            onClick={() => setActiveTab(repliesTab)}
                        >Tweets &amp; replies</button>
                        <button 
                            className="profile-tab" 
                            ref={mediaTab}
                            onClick={() => setActiveTab(mediaTab)}
                        >Media</button>
                        <button 
                            className="profile-tab" 
                            ref={likesTab}
                            onClick={() => setActiveTab(likesTab)}
                        >Likes</button>
                    </div>
                </div>
                <div className="tweets-container" ref={tweetsContainer}>
                    { tweets ? getTweetsDisplay() : null}
                </div>
                <NewTweetButton />
                {optionsDisplay === false ? null :
                    <TweetOptions 
                        handleOptionsView={handleOptionsView} 
                        tweet={tweetOptions} 
                        handleDeleteTweet={handleDeleteTweet}
                        handleDeleteReply={handleDeleteReply}
                    />
                }
                {optionsDisplay ? <Overlay /> : null}
            </main>
            <MobileFooterMenu page="profile" />
        </div>
    );
}

export default Profile;
