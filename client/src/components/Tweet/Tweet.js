import React, { useEffect, useRef } from 'react';
import './Tweet.scss';
import profilePic from '../../assets/images/default-profile-pic.png';

const Tweet = (props) => {

    const likeButton = useRef();
    const retweetButton = useRef();

    const checkLiked = () => {
        const userLikes = props.activeUser.likes;
        const liked = userLikes.includes(props.tweet._id);
        return liked;
    }

    const checkRetweeted = () => {
        const userRetweets = props.activeUser.retweets;
        const retweeted = userRetweets.includes(props.tweet._id);
        return retweeted;
    }

    useEffect(() => {
        const liked = checkLiked();
        if (liked) {
            likeButton.current.classList.add('liked');
        } else {
            likeButton.current.classList.remove('liked');
        }

        const retweeted = checkRetweeted();
        if (retweeted) {
            retweetButton.current.classList.add('retweeted');
        } else {
            retweetButton.current.classList.remove('retweeted');
        }
    });

    const handleLikeEvent = () => {
        const liked = checkLiked();
        if (liked) {
            props.handleUnlike(props.tweet._id);
        } else {
            props.handleLike(props.tweet._id);
        }
    }

    const handleRetweetEvent = () => {
        const retweeted = checkRetweeted();
        if (retweeted) {
            props.handleRemoveRetweet(props.tweet._id);
        } else {
            props.handleRetweet(props.tweet._id);
        }
    }
    
    const displayDate = () => {
        const tweetTime = new Date(props.tweet.createdAt);
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

    return (
        <div className="tweet">
            <img className="tweet-profile-pic" src={profilePic} alt="" />
            <div className="main-tweet-content">
                <div className="tweet-header">
                    <div className="tweet-header-main">
                        <span className="tweet-user-name">{props.user ? props.user.displayName : ''}</span>
                        <span className="tweet-user-username">{props.user ? `@${props.user.username}` : ''}</span>
                        <div className="separator"></div>
                        <span className="tweet-time">{displayDate()}</span>
                    </div>
                    <div className="options-container">
                        {
                            props.activeUser._id !== props.tweet.userId ? null :
                                <button className="options">
                                    <span className="hidden">Options</span>
                                </button>
                        }
                    </div>
                </div>
                <div className="tweet-main">{props.tweet.text}</div>
                <div className="tweet-footer">
                    <button className="tweet-action reply-button" aria-label="Reply to tweet">{props.tweet.replies.length}</button>
                    <button 
                        className="tweet-action retweet-button" 
                        aria-label="Retweet"
                        onClick={handleRetweetEvent}
                        ref={retweetButton}
                    >
                        {props.tweet.retweets.length}
                    </button>
                    <button 
                        className="tweet-action like-button" 
                        aria-label="Like tweet"
                        onClick={handleLikeEvent}
                        ref={likeButton}
                    >
                        {props.tweet.likes.length}
                    </button>
                    <button className="share-button" aria-label="Share">
                        <span className="hidden">Share</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Tweet;
