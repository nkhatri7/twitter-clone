import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NewTweetButton.scss';

const NewTweetButton = () => {

    const navigate = useNavigate();

    return (
        <button className="new-tweet-btn" aria-label="New tweet" onClick={() => navigate('/compose/tweet')}>+</button>
    );
}

export default NewTweetButton;
