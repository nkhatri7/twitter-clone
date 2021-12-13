import React, { useState } from 'react';
import './TweetOptions.scss';

const TweetOptions = ({ handleOptionsView, tweet, handleDeleteTweet, handleDeleteReply }) => {

    const [confirmationModalDisplay, setConfirmationModalDisplay] = useState(false);

    const handleConfirmationDisplayToggle = () => {
        setConfirmationModalDisplay(display => !display);
    }

    const handleDeleteTweetEvent = () => {
        if (tweet.reply) {
            handleDeleteReply(tweet.replyTo, tweet._id);
        } else {
            handleDeleteTweet(tweet._id);
        }
        handleConfirmationDisplayToggle();
        handleOptionsView();
    }

    return (
        <div className="tweet-options">
            <ul>
                <li>
                    <button className="tweet-option" onClick={handleConfirmationDisplayToggle}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#E03B39">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span className="delete-tweet">Delete</span>
                    </button>
                </li>
                <li>
                    <button className="tweet-option">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Edit Tweet</span>
                    </button>
                </li>
                <li>
                    <button className="tweet-option">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                        <span>Embed Tweet</span>
                    </button>
                </li>
            </ul>
            <button className="cancel-options" onClick={handleOptionsView}>Cancel</button>
            {confirmationModalDisplay === false ? null :
                <div className="delete-tweet-confirmation">
                    <span>Are you sure you want to delete your tweet?</span>
                    <div className="delete-tweet-action-buttons">
                        <button className="cancel-delete-tweet" onClick={handleConfirmationDisplayToggle}>Cancel</button>
                        <button className="delete-tweet-btn" onClick={handleDeleteTweetEvent}>Delete</button>
                    </div>
                </div>
            }
        </div>
    );
}

export default TweetOptions;
