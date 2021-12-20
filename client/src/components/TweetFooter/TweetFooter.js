import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import './TweetFooter.scss';

const TweetFooter = ({ 
    tweet, 
    user, 
    activeUser, 
    handleLike, 
    handleUnlike, 
    handleRetweet, 
    handleRemoveRetweet, 
    handleShareTweet 
}) => {

    const likeButton = useRef(null);
    const retweetButton = useRef(null);
    const navigate = useNavigate();

    const checkLiked = () => {
        const userLikes = activeUser.likes;
        const liked = userLikes.includes(tweet._id);
        return liked;
    }

    const checkRetweeted = () => {
        const userRetweets = activeUser.retweets;
        const retweeted = userRetweets.includes(tweet._id);
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
            handleUnlike(tweet._id);
        } else {
            handleLike(tweet._id);
        }
    }

    const handleRetweetEvent = () => {
        const retweeted = checkRetweeted();
        if (retweeted) {
            handleRemoveRetweet(tweet._id);
        } else {
            handleRetweet(tweet._id);
        }
    }

    return (
        <div className="tweet-footer">
            <button 
                className="tweet-action reply-button" 
                aria-label="Reply to tweet"
                onClick={() => navigate(`/${user.username}/status/${tweet._id}/reply`)}
            >
                {tweet.replies.length}
            </button>
            <button 
                className="tweet-action retweet-button" 
                aria-label="Retweet"
                onClick={handleRetweetEvent}
                ref={retweetButton}
            >
                {tweet.retweets.length}
            </button>
            <button 
                className="tweet-action like-button" 
                aria-label="Like tweet"
                onClick={handleLikeEvent}
                ref={likeButton}
            >
                {tweet.likes.length}
            </button>
            <button className="share-button" aria-label="Share" onClick={() => handleShareTweet(tweet, user)}>
                <span className="hidden">Share</span>
            </button>
        </div>
    );
}

export default TweetFooter;
