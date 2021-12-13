import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import './NewTweet.scss';
import profilePic from '../../assets/images/default-profile-pic.png';

const NewTweet = ({ handleNewTweet }) => {

    const [tweetText, setTweetText] = useState('');
    const [disabled, setDisabled] = useState(true);

    const limitWarning = useRef(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        if (tweetText.trim() === '' || tweetText.trim().length > 280) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }

        if (tweetText.trim().length > 280) {
            limitWarning.current.style.display = 'block';
        } else {
            limitWarning.current.style.display = 'none';
        }
    }, [tweetText]);

    const handleTweetInputChange = e => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        setTweetText(e.target.value);
    }

    const handleBackNavigation = () => {
        navigate('/home');
    }

    const handleNewTweetEvent = () => {
        if (tweetText.trim()) {
            handleNewTweet(tweetText);
            navigate('/home');
        }
    }

    return (
        <div className="new-tweet-container">
            <header>
                <button className="back-btn" aria-label="Go back" onClick={handleBackNavigation}>
                    <span className="hidden">Back</span>
                </button>
                <button className="tweet-btn" onClick={handleNewTweetEvent} disabled={disabled}>Tweet</button>
            </header>
            <main>
                <div className="new-tweet-main-container">
                    <img src={profilePic} alt="" className="new-tweet-profile-pic" />
                    <div className="tweet-input-container">
                        <textarea 
                            name="tweet-text"
                            className="tweet-input"
                            placeholder="What's happening?"
                            value={tweetText}
                            onChange={handleTweetInputChange}
                        />
                        <span className="limit-warning" ref={limitWarning}>Limit is 280 characters</span>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default NewTweet;
