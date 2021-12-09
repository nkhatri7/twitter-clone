import React from 'react';
import './Tweet.scss';
import profilePic from '../../assets/images/default-profile-pic.png';

const Tweet = ({ tweet, user, activeUser }) => {
    
    const displayDate = () => {
        const tweetTime = new Date(tweet.createdAt);
        const difference = (Date.now() - tweetTime) / (1000 * 60);
        
        if (difference < 60) {
            return `${difference.toFixed(0)}m`;
        } else if (difference < 1440) {
            return `${(difference / 60).toFixed(0)}h`;
        } else if (difference < 10080) {
            return `${(difference / (60 * 24)).toFixed(0)}d`;
        } else {
            return tweetTime.toLocaleDateString('en-AU');
        }
    }

    return (
        <div className="tweet">
            <img className="tweet-profile-pic" src={profilePic} alt="" />
            <div className="main-tweet-content">
                <div className="tweet-header">
                    <span className="tweet-user-name">{user ? user.displayName : ''}</span>
                    <span className="tweet-user-username">{user ? `@${user.username}` : ''}</span>
                    <div className="separator"></div>
                    <span className="tweet-time">{displayDate()}</span>
                </div>
                <div className="tweet-main">{tweet.text}</div>
                <div className="tweet-footer">
                    <button className="tweet-action reply-button" aria-label="Reply to tweet">{tweet.replies.length}</button>
                    <button className="tweet-action retweet-button" aria-label="Retweet">{tweet.retweets.length}</button>
                    <button className="tweet-action like-button" aria-label="Like tweet">{tweet.likes.length}</button>
                    <button className="share-button" aria-label="Share">
                        <span className="hidden">Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Tweet;
