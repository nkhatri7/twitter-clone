import React from 'react';
import './ShareTweet.scss';

const ShareTweet = ({ tweet, user, activeUser, handleShareView, handleBookmark, handleRemoveBookmark }) => {

    const handleBookmarkEvent = () => {
        if (activeUser.bookmarks.includes(tweet._id)) {
            handleRemoveBookmark(tweet._id);
        } else {
            handleBookmark(tweet._id);
        }
        handleShareView();
    }

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(`http://localhost:3000/${user.username}/status/${tweet._id}`);
        handleShareView();
        window.alert('Link copied to clipboard');
    }

    return (
        <div className='share-tweet'>
            <ul>
                <li>
                    <button className="share-option">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="share-text">Send via Direct Message</span>
                    </button>
                </li>
                <li>
                    <button className="share-option" onClick={handleBookmarkEvent}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                        <span className="share-text">
                            {activeUser.bookmarks.includes(tweet._id) ? 'Remove Tweet from Bookmarks' : 'Bookmark'}
                        </span>
                    </button>
                </li>
                <li>
                    <button className="share-option" onClick={handleCopyLink}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="#6F767C">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        <span className="share-text">Copy Link to Tweet</span>
                    </button>
                </li>
            </ul>
            <button className="cancel-share" onClick={handleShareView}>Cancel</button>
        </div>
    );
}

export default ShareTweet;
