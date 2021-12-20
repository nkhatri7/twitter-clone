import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import './Tweet.scss';
import profilePic from '../../assets/images/default-profile-pic.png';
import TweetFooter from '../TweetFooter/TweetFooter';

const Tweet = ({ 
    tweet, 
    user, 
    activeUser, 
    handleLike, 
    handleUnlike, 
    handleRetweet, 
    handleRemoveRetweet, 
    handleTweetOptions,
    handleShareTweet,
    }) => {

    const [originalTweetUsername, setOriginalTweetUsername] = useState(null);
    const navigate = useNavigate();
    
    const displayDate = () => {
        const tweetTime = new Date(tweet.createdAt);
        const difference = (Date.now() - tweetTime) / (1000 * 60);
        
        if (difference < 1) {
            return `${(difference * 60).toFixed(0)}s`;
        } else if (difference < 60) {
            return `${difference.toFixed(0)}m`;
        } else if (difference < 1440) {
            return `${(difference / 60).toFixed(0)}h`;
        } else if (difference < 10080) {
            return `${(difference / (60 * 24)).toFixed(0)}d`;
        } else {
            return tweetTime.toLocaleDateString('en-AU');
        }
    }

    const getOriginalTweetUser = async () => {
        try {
            const tweetRes = await fetch(`http://localhost:5000/api/tweets/${tweet.replyTo}`);
            const originalTweet = await tweetRes.json();
            const userRes = await fetch(`http://localhost:5000/api/users/${originalTweet.userId}`);
            const user = await userRes.json();
            setOriginalTweetUsername(user.username);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (tweet.reply) {
            getOriginalTweetUser();
        }
    });

    return (
        <div className="tweet">
            <img className="tweet-profile-pic" src={profilePic} alt="" onClick={() => navigate(`/${user.username}`)} />
            <div className="main-tweet-content">
                <div className="tweet-header">
                    <div className="tweet-header-main-container">
                        <div className="tweet-header-main">
                            <span 
                                className="tweet-user-name" 
                                onClick={() => navigate(`/${user.username}`)}
                            >{user ? user.displayName : ''}</span>
                            <span 
                                className="tweet-user-username" 
                                onClick={() => navigate(`/${user.username}`)}
                            >{user ? `@${user.username}` : ''}</span>
                            <div className="separator"></div>
                            <span className="tweet-time">{displayDate()}</span>
                        </div>
                        <div className="reply-info">
                            {tweet.reply && originalTweetUsername ? 
                                <p>Replying to <span>@{originalTweetUsername}</span></p> 
                            : null}
                        </div>
                    </div>
                    <div className="options-container">
                        {
                            activeUser._id !== tweet.userId ? null :
                                <button className="options" onClick={() => handleTweetOptions(tweet)}>
                                    <span className="hidden">Options</span>
                                </button>
                        }
                    </div>
                </div>
                <div className="tweet-main" onClick={() => navigate(`/${user.username}/status/${tweet._id}`)}>{tweet.text}</div>
                <TweetFooter
                    tweet={tweet}
                    user={user}
                    activeUser={activeUser} 
                    handleLike={handleLike} 
                    handleUnlike={handleUnlike} 
                    handleRetweet={handleRetweet} 
                    handleRemoveRetweet={handleRemoveRetweet}
                    handleShareTweet={handleShareTweet}
                />
            </div>
        </div>
    );
}

export default Tweet;
