import React from 'react';
import { useNavigate } from 'react-router';
import './ComposeTweetHeader.scss';

const ComposeTweetHeader = ({ disabled, handleNewTweet, handleReply, type, tweetId, text }) => {

    const navigate = useNavigate();

    const handleBackNavigation = () => {
        navigate(-1);
    }

    const handleComposeTweet = () => {
        if (text.trim()) {
            type === 'Reply' ? handleReply(tweetId, text) : handleNewTweet(text);
            navigate(-1);
        }
    }

    return (
        <header className="compose-tweet-header">
            <button className="back-btn" aria-label="Go back" onClick={handleBackNavigation}>
                <span className="hidden">Back</span>
            </button>
            <button className="tweet-btn" onClick={handleComposeTweet} disabled={disabled}>{type}</button>
        </header>
    );
}

export default ComposeTweetHeader;
