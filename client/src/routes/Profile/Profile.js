import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './Profile.scss';
import profilePic from '../../assets/images/default-profile-pic.png';
import retweetIcon from '../../assets/images/retweet.svg';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import NewTweetButton from '../../components/NewTweetButton/NewTweetButton';
import ShareTweet from '../../components/ShareTweet/ShareTweet';
import Tweet from '../../components/Tweet/Tweet';
import TweetOptions from '../../components/TweetOptions/TweetOptions';
import Overlay from '../../components/Overlay/Overlay';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const Profile = ({ 
    activeUser, 
    handleLike, 
    handleUnlike, 
    handleRetweet, 
    handleRemoveRetweet, 
    handleDeleteReply, 
    handleDeleteTweet,
    handleBookmark,
    handleRemoveBookmark,
    handleFollowUser,
    handleUnfollowUser
}) => {

    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tweets, setTweets] = useState(null);
    const [retweets, setRetweets] = useState(null);
    const [retweetUsers, setRetweetUsers] = useState(null);
    const [likedTweets, setLikedTweets] = useState(null);
    const [likedTweetsUsers, setLikedTweetsUsers] = useState(null);
    const [optionsDisplay, setOptionsDisplay] = useState(false);
    const [tweetOptions, setTweetOptions] = useState(null);
    const [shareDisplay, setShareDisplay] = useState(false);
    const [tweetShare, setTweetShare] = useState(null);

    const tweetTab = useRef(null);
    const repliesTab = useRef(null);
    const mediaTab = useRef(null);
    const likesTab = useRef(null);
    const [activeTab, setActiveTab] = useState(tweetTab);

    useEffect(() => {
        if (activeUser) {
            if (username !== activeUser.username) {
                axios.get(`http://localhost:5000/api/users/username/${username}`)
                    .then(res => setUser(res.data))
                    .catch(err => console.log(err));
            } else {
                setUser(activeUser);
            }
        }
    }, [username, activeUser]);

    useEffect(() => {
        if (user) {
            const userTweets = user.tweets;
            if (userTweets.length > 0) {
                axios.get(`http://localhost:5000/api/users/${user._id}/tweets`)
                    .then(res => setTweets(res.data))
                    .catch(err => console.log(err));
            } else {
                setTweets([]);
            }

            const userLikes = user.likes;
            if (userLikes.length > 0) {
                axios.get(`http://localhost:5000/api/users/${user._id}/likes`)
                    .then(res => setLikedTweets(res.data))
                    .catch(err => console.log(err));
            } else {
                setLikedTweets([]);
                setLikedTweetsUsers([]);
            }

            const userRetweets = user.retweets;
            if (userRetweets.length > 0) {
                axios.get(`http://localhost:5000/api/users/${user._id}/retweets`)
                    .then(res => setRetweets(res.data))
                    .catch(err => console.log(err));
            } else {
                setRetweets([]);
                setRetweetUsers([]);
            }
        }
    }, [user]);

    useEffect(() => {
        if (retweets) {
            const allRetweetUsers = [];
            retweets.forEach(tweet => {
                axios.get(`http://localhost:5000/api/users/${tweet.userId}`)
                    .then(res => {
                        allRetweetUsers.push(res.data);
                        const uniqueUsers = [...new Map(allRetweetUsers.map(user => [user['username'], user])).values()];
                        setRetweetUsers(uniqueUsers);
                    })
                    .catch(err => console.log(err));
            });
        }
    }, [retweets]);

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
    
    const handleFollowEvent = () => {
        if (activeUser.following.includes(user._id)) {
            handleUnfollowUser(user._id);
        } else {
            handleFollowUser(user._id);
        }
    }

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

    const handleShareTweetEvent = (tweet, user) => {
        setTweetShare({ tweet: tweet, user: user });
        handleShareView();
    }

    const handleShareView = () => {
        setShareDisplay(display => !display);
    }

    const sortTweets = (tweets) => {
        const sortedTweets = tweets.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
        return sortedTweets;
    }

    const filterTweets = () => {
        if (tweets && likedTweets) {
            if (activeTab === tweetTab) {
                const filteredTweets = tweets.filter(tweet => tweet.reply === false);
                return sortTweets([...filteredTweets, ...retweets]);
            } else if (activeTab === repliesTab) {
                return sortTweets(tweets);
            } else if (activeTab === mediaTab) {
                return [];
            } else if (activeTab === likesTab) {
                return [...likedTweets].reverse();
            }
        }
    }

    const getTweetsDisplay = () => {
        if (tweets && retweets && likedTweets && retweetUsers && likedTweetsUsers) {
            const tweetsDisplay = filterTweets().map(tweet => {
                const tweetUsers = [...retweetUsers, ...likedTweetsUsers];
                const tweetUser = tweetUsers.find(user => user._id === tweet.userId);
                
                return (
                    <div className="tweet-container" key={tweet._id}>
                        {user.retweets.includes(tweet._id) && activeTab !== likesTab ? 
                            <div className="retweet-container">
                                <img src={retweetIcon} alt="Retweet icon" className="retweet-icon" />
                                <span className="retweet-text">
                                    {user._id === activeUser._id ? 'You' : user.displayName}&nbsp;retweeted
                                </span>
                            </div>
                            : null
                        }
                        <Tweet
                            tweet={tweet}
                            user={user._id === tweet.userId ? user : tweetUser}
                            activeUser={activeUser}
                            handleLike={handleLike}
                            handleUnlike={handleUnlike}
                            handleRetweet={handleRetweet}
                            handleRemoveRetweet={handleRemoveRetweet}
                            handleTweetOptions={handleTweetOptionsEvent}
                            handleShareTweet={handleShareTweetEvent}
                        />
                    </div>
                );
            });
            return tweetsDisplay;
        }
    }

    return (
        <div className='profile'>
            <div className="profile-wrapper">
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
                    <div className="profile-main-wrapper">
                        <DesktopMenu activeUser={activeUser} page={activeUser === user ? 'Profile' : 'Other User Profile'} />
                        <div className="profile-main-container">
                            <div className="profile-cover-photo"></div>
                            <div className="profile-details">
                                <div className="profile-details-header">
                                    <img src={profilePic} alt="" className="profile-pic" />
                                    {
                                        user === null ? null 
                                            : (user._id === activeUser._id) ?
                                                <button 
                                                    className="edit-account-btn" 
                                                    onClick={() => navigate('/settings/profile')}
                                                >Edit profile</button> 
                                            : 
                                                <button 
                                                    className={
                                                        `follow-btn ${activeUser.following.includes(user._id) ? `following` : `follow`}`
                                                    }
                                                    onClick={handleFollowEvent}
                                                >
                                                {activeUser.following.includes(user._id) ? 'Following' : 'Follow'}
                                                </button>
                                    }
                                </div>
                                <span className="profile-display-name">{user ? user.displayName : ''}</span>
                                <div className="profile-username-container">
                                    <span className="profile-username">@{user ? user.username : ''}</span>
                                    {user === null ? null : (user.following.includes(activeUser._id)) ? 
                                        <div className="follows-you-tag">Follows you</div> : null
                                    }
                                </div>
                                { user === null ? null : (user.bio) ? <span className="profile-bio">{user.bio}</span> : null }
                                <div className="joined-date">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span>Joined {user ? getJoinedDate() : ''}</span>
                                </div>
                                <div className="profile-network-container">
                                    <div className="profile-network" onClick={() => navigate(`/${user.username}/following`)}>
                                        <span className="profile-network-number">{user ? user.following.length : ''}</span>
                                        &nbsp;Following
                                    </div>
                                    <div className="profile-network" onClick={() => navigate(`/${user.username}/followers`)}>
                                        <span className="profile-network-number">{user ? user.followers.length : ''}</span>
                                        &nbsp;Followers
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
                        <div className="tweets-container">
                            { tweets ? getTweetsDisplay() : null}
                        </div>
                        <NewTweetButton />
                    </div>
                    {optionsDisplay === false ? null :
                        <TweetOptions 
                            handleOptionsView={handleOptionsView} 
                            tweet={tweetOptions} 
                            handleDeleteTweet={handleDeleteTweet}
                            handleDeleteReply={handleDeleteReply}
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
                <MobileFooterMenu page="profile" />
            </div>
        </div>
    );
}

export default Profile;
