import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import './Bookmarks.scss';
import Tweet from '../../components/Tweet/Tweet';
import Overlay from '../../components/Overlay/Overlay';
import ShareTweet from '../../components/ShareTweet/ShareTweet';
import TweetOptions from '../../components/TweetOptions/TweetOptions';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const Bookmarks = ({ 
    activeUser, 
    handleLike, 
    handleUnlike, 
    handleRetweet, 
    handleRemoveRetweet, 
    handleDeleteTweet,
    handleRemoveBookmark,
    handleClearBookmarks
}) => {

    const [bookmarks, setBookmarks] = useState(null);
    const [bookmarkUsers, setBookmarkUsers] = useState(null);
    const [optionsDisplay, setOptionsDisplay] = useState(false);
    const [tweetOptions, setTweetOptions] = useState(null);
    const [shareDisplay, setShareDisplay] = useState(false);
    const [tweetShare, setTweetShare] = useState(null);
    const [bookmarkOptionsDisplay, setBookmarkOptionsDisplay] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (activeUser) {
            if (activeUser.bookmarks.length > 0) {
                axios.get(`http://localhost:5000/api/users/${activeUser._id}/bookmarks`)
                    .then(res => setBookmarks(res.data))
                    .catch(err => console.log(err));
            } else {
                setBookmarks(null);
            }
        }
    }, [activeUser]);

    useEffect(() => {
        if (bookmarks) {
            const allBookmarksUsers = [];
            bookmarks.forEach(tweet => {
                axios.get(`http://localhost:5000/api/users/${tweet.userId}`)
                    .then(res => {
                        allBookmarksUsers.push(res.data);
                        const uniqueUsers = [...new Map(allBookmarksUsers.map(user => [user['username'], user])).values()];
                        setBookmarkUsers(uniqueUsers);
                    })
                    .catch(err => console.log(err));
            });
        }
    }, [bookmarks]);

    const handleClearBookmarksEvent = () => {
        handleClearBookmarks();
        handleBookmarkOptionsView();
    }

    const handleTweetOptionsEvent = (tweet) => {
        setTweetOptions(tweet);
        handleOptionsView();
    }

    const handleOptionsView = () => {
        setOptionsDisplay(display => !display);
    } 

    const handleShareTweetEvent = (tweet, user) => {
        setTweetShare({tweet: tweet, user: user});
        handleShareView();
    }

    const handleShareView = () => {
        setShareDisplay(display => !display);
    }

    const handleBookmarkOptionsView = () => {
        setBookmarkOptionsDisplay(display => !display);
    }

    const getTweetsDisplay = () => {
        if (bookmarks && bookmarkUsers) {
            const tweetsDisplay = [...bookmarks].reverse().map(tweet => {
                const user = bookmarkUsers.find(user => user._id === tweet.userId);

                return (
                    <Tweet 
                        key={tweet._id}
                        tweet={tweet}
                        user={user}
                        activeUser={activeUser}
                        handleLike={handleLike}
                        handleUnlike={handleUnlike}
                        handleRetweet={handleRetweet}
                        handleRemoveRetweet={handleRemoveRetweet}
                        handleTweetOptions={handleTweetOptionsEvent}
                        handleShareTweet={handleShareTweetEvent}
                    />
                );
            });
            return tweetsDisplay;
        }
    }

    return (
        <div className='bookmarks'>
            <header className="bookmarks-header">
                <div className="bookmarks-header-main">
                    <button className="back" aria-label='Go back' onClick={() => navigate(-1)}>
                        <span className="hidden">Back</span>
                    </button>
                    <div className="bookmarks-header-content">
                        <h1>Bookmarks</h1>
                        <span className="bookmarks-user-username">@{activeUser ? activeUser.username : ''}</span>
                    </div>
                </div>
                <button className="bookmarks-options-btn" aria-label='Bookmarks options' onClick={handleBookmarkOptionsView}>
                    <span className="hidden">Bookmark options</span>
                </button>
            </header>
            <main className="bookmarks-main">
                <DesktopMenu activeUser={activeUser} page="Bookmarks" />
                <div className="tweets-container">
                    {bookmarks ? getTweetsDisplay() : null}
                </div>
                {optionsDisplay || shareDisplay || bookmarkOptionsDisplay ? <Overlay /> : null}
                {optionsDisplay === false ? null :
                    <TweetOptions 
                        handleOptionsView={handleOptionsView} 
                        tweet={tweetOptions} 
                        handleDeleteTweet={handleDeleteTweet}
                    />
                }
                {shareDisplay === false ? null :
                    <ShareTweet
                        tweet={tweetShare.tweet}
                        user={tweetShare.user}
                        activeUser={activeUser}
                        handleShareView={handleShareView}
                        handleRemoveBookmark={handleRemoveBookmark}
                    />
                }
                {bookmarkOptionsDisplay ? 
                    <div className="bookmark-options">
                        <button className="clear-bookmarks" onClick={handleClearBookmarksEvent}>Clear all bookmarks</button>
                        <button className="cancel" onClick={handleBookmarkOptionsView}>Cancel</button>
                    </div>
                    : null
                }
            </main>
            <MobileFooterMenu page={'bookmarks'} />
        </div>
    );
}

export default Bookmarks;
