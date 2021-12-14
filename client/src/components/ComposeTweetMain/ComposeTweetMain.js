import React, { useEffect, useRef } from 'react';
import './ComposeTweetMain.scss';
import profilePic from '../../assets/images/default-profile-pic.png';

const ComposeTweetMain = ({ text, handleSetDisabled, handleSetText, placeholder }) => {

    const limitWarning = useRef(null);

    useEffect(() => {
        if (text.trim() === '' || text.trim().length > 280) {
            handleSetDisabled(true);
        } else {
            handleSetDisabled(false);
        }

        if (text.trim().length > 280) {
            limitWarning.current.style.display = 'block';
        } else {
            limitWarning.current.style.display = 'none';
        }
    });

    const handleTweetInputChange = e => {
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        handleSetText(e.target.value);
    }

    return (
        <div className="compose-tweet-main-container">
            <img src={profilePic} alt="" className="compose-tweet-profile-pic" />
            <div className="tweet-input-container">
                <textarea 
                    name="tweet-text"
                    className="tweet-input"
                    placeholder={placeholder}
                    value={text}
                    onChange={handleTweetInputChange}
                />
                <span className="limit-warning" ref={limitWarning}>Limit is 280 characters</span>
            </div>
        </div>
    );
}

export default ComposeTweetMain;
