import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import './DetailedTweet.scss';
import profilePic from '../../assets/images/default-profile-pic.png';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import TweetOptions from '../../components/TweetOptions/TweetOptions';
import Overlay from '../../components/Overlay/Overlay';
import ShareTweet from '../../components/ShareTweet/ShareTweet';
import Tweet from '../../components/Tweet/Tweet';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const DetailedTweet = ({ 
    activeUser, 
    handleLike, 
    handleUnlike, 
    handleRetweet, 
    handleRemoveRetweet,
    handleReply,
    handleDeleteReply,
    handleDeleteTweet,
    handleBookmark,
    handleRemoveBookmark
}) => {

    const { tweetId } = useParams();
    const [tweet, setTweet] = useState(null);
    const [user, setUser] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [replyBtnDisplay, setReplyBtnDisplay] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [replies, setReplies] = useState([]);
    const [replyUsers, setReplyUsers] = useState([]);
    const [optionsDisplay, setOptionsDisplay] = useState(false);
    const [tweetOptions, setTweetOptions] = useState(null);
    const [shareDisplay, setShareDisplay] = useState(false);
    const [tweetShare, setTweetShare] = useState(null);
    const likeButton = useRef(null);
    const retweetButton = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/tweets/${tweetId}`)
            .then(res => setTweet(res.data))
            .catch(err => console.log(err));
    }, [tweetId, activeUser]);

    useEffect(() => {
        if (tweet) {
            axios.get(`http://localhost:5000/api/users/${tweet.userId}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err));
            if (tweet.replies.length > 0) {
                const replies = tweet.replies;
                const allReplies = [];
                replies.forEach(replyId => {
                    axios.get(`http://localhost:5000/api/tweets/${replyId}`)
                        .then(res => {
                            allReplies.push(res.data);
                            setReplies(allReplies);
                        })
                        .catch(err => console.log(err));
                });
            } else {
                setReplies([]);
            }
        }
    }, [tweet]);

    useEffect(() => {
        if (replies.length > 0) {
            const allReplyUsers = [];
            replies.forEach(reply => {
                axios.get(`http://localhost:5000/api/users/${reply.userId}`)
                    .then(res => {
                        allReplyUsers.push(res.data);
                        setReplyUsers(allReplyUsers);
                    })
                    .catch(err => console.log(err));
            });
        }
    }, [replies]);

    useEffect(() => {
        replyText || replyText.length > 280 ? setDisabled(false) : setDisabled(true);
    }, [replyText]);

    useEffect(() => {
        if (tweet && activeUser) {
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
        }
    });

    const checkLiked = () => {
        const userLikes = activeUser.likes;
        const liked = userLikes.includes(tweetId);
        return liked;
    }

    const checkRetweeted = () => {
        const userRetweets = activeUser.retweets;
        const retweeted = userRetweets.includes(tweetId);
        return retweeted;
    }

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

    const handleTweetOptionsEvent = (tweet) => {
        setTweetOptions(tweet);
        handleOptionsView();
    }

    const handleOptionsView = () => {
        setOptionsDisplay(display => !display);
    }

    const handleShareTweetEvent = (tweet, user) => {
        setTweetShare({ tweet: tweet, user: user });
        handleShareView();
    }

    const handleShareView = () => {
        setShareDisplay(display => !display);
    }

    const formatNumber = (num) => {
        return num < 10 ? `0${num}` : num;
    }

    const tweetTime = () => {
        const tweetDateTime = new Date(tweet.createdAt);
        if (tweetDateTime.getHours() > 12) {
            return `${tweetDateTime.getHours() - 12}:${formatNumber(tweetDateTime.getMinutes())} PM`;
        } else {
            return `${tweetDateTime.getHours()}:${formatNumber(tweetDateTime.getMinutes())} AM`;
        }
    }

    const tweetDate = () => {
        const tweetDateTime = new Date(tweet.createdAt);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${formatNumber(tweetDateTime.getDate())} ${months[tweetDateTime.getMonth()]} ${tweetDateTime.getFullYear()}`;
    }

    const handleReplyInputChange = (e) => {
        setReplyText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        if (e.target.value === '') {
            e.target.style.height = '63px';
        }
    }

    const handleReplyEvent = () => {
        if (replyText.trim()) {
            handleReply(tweetId, replyText);
            setReplyText('');
            setReplyBtnDisplay(false);
        }
    }

    const repliesDisplay = replies.map(reply => {
        const replyUser = replyUsers.find(user => user._id === reply.userId);

        return (
            <Tweet 
                key={reply._id}
                tweet={reply}
                user={replyUser ? replyUser : {}}
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

    return (
        <div className="detailed-tweet">
            <header>
                <button className="back" aria-label="Go back" onClick={() => navigate(-1)}>
                    <span className="hidden">Back</span>
                </button>
                <h1>Tweet</h1>
            </header>
            <main>
                <DesktopMenu activeUser={activeUser} page="Detailed Tweet" />
                <div className="tweet-header">
                    <div className="tweet-header-main">
                        <img src={profilePic} alt="" className="profile-pic" onClick={() => navigate(`/${user.username}`)} />
                        <div className="user-details" onClick={() => navigate(`/${user.username}`)}>
                            <span className="name">{user ? user.displayName : null}</span>
                            <span className="username">@{user ? user.username : null}</span>
                        </div>
                    </div>
                    <div className="options-container">
                        {   
                            tweet && activeUser._id !== tweet.userId ? null :
                                <button className="options" onClick={() => handleTweetOptionsEvent(tweet)}>
                                    <span className="hidden">Options</span>
                                </button>
                        }
                    </div>
                </div>
                <div className="tweet-main">{tweet ? tweet.text : null}</div>
                <div className="tweet-datetime-details">
                    <span className="tweet-time">{tweet ? tweetTime() : null}</span>
                    <div className="separator"></div>
                    <span className="tweet-date">{tweet ? tweetDate() : null}</span>
                </div>
                <div className="tweet-interactions-container">
                    {tweet ? (tweet.retweets.length > 0 || tweet.likes.length > 0) ? 
                        <div className="detailed-tweet-interactions-wrapper">
                            <div className="detailed-tweet-interactions-container">
                            {tweet.retweets.length === 0 ? null :
                                <div 
                                    className="detailed-tweet-interaction-container"
                                    onClick={() => navigate(`/${user.username}/status/${tweetId}/retweets`)}
                                >
                                    <span className="detailed-tweet-interaction-number">{tweet.retweets.length}</span>
                                    &nbsp;{tweet.retweets.length > 1 ? 'Retweets' : 'Retweet'}
                                </div>
                            }
                            {tweet.likes.length === 0 ? null : 
                                <div 
                                    className="detailed-tweet-interaction-container"
                                    onClick={() => navigate(`/${user.username}/status/${tweetId}/likes`)}
                                >
                                    <span className="detailed-tweet-interaction-number">{tweet.likes.length}</span>
                                    &nbsp;{tweet.likes.length > 1 ? 'Likes' : 'Like'}
                                </div>
                            }
                        </div>
                        </div> : null : null
                    }
                    <div className="detailed-tweet-footer-container">
                        <div className="detailed-tweet-footer">
                            <button 
                                className="tweet-action reply-btn" 
                                aria-label='Reply to tweet' 
                                onClick={() => navigate(`/${user.username}/status/${tweetId}/reply`)}
                            >
                                <span className="hidden">Reply</span>
                            </button>
                            <button 
                                className="tweet-action retweet-btn" 
                                aria-label='Retweet' 
                                onClick={handleRetweetEvent}
                                ref={retweetButton}
                            >
                                <span className="hidden">Retweet</span>
                            </button>
                            <button 
                                className="tweet-action like-btn" 
                                aria-label='Like tweet' 
                                onClick={handleLikeEvent}
                                ref={likeButton}
                            >
                                <span className="hidden">Like</span>
                            </button>
                            <button 
                                className="tweet-action share-btn" 
                                aria-label='Share tweet' 
                                onClick={() => handleShareTweetEvent(tweet, user)}
                            >
                                <span className="hidden">Share</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="reply-container">
                    <img src={profilePic} alt="" className="active-user-profile-pic"/>
                    <div className="reply-actions-container">
                        <textarea 
                            name="reply-text"
                            className="reply-input"
                            placeholder="Tweet your reply"
                            value={replyText}
                            onChange={handleReplyInputChange}
                            onFocus={() => setReplyBtnDisplay(true)}
                        />
                        {replyBtnDisplay ? 
                            <button className="reply-btn" disabled={disabled} onClick={handleReplyEvent}>Reply</button> 
                        : null}
                    </div>
                </div>
                {replyUsers.length > 0 ? repliesDisplay : null}
                {optionsDisplay === false ? null :
                    <TweetOptions 
                        handleOptionsView={handleOptionsView} 
                        tweet={tweetOptions} 
                        handleDeleteTweet={handleDeleteTweet}
                        handleDeleteReply={handleDeleteReply}
                    />
                }
                {optionsDisplay || shareDisplay ? <Overlay /> : null}
                {shareDisplay === false ? null :
                    <ShareTweet
                        tweet={tweetShare.tweet}
                        user={tweetShare.user}
                        activeUser={activeUser}
                        handleShareView={handleShareView}
                        handleBookmark={handleBookmark}
                        handleRemoveBookmark={handleRemoveBookmark}
                    />
                }
            </main>
            <MobileFooterMenu page="tweet" />
        </div>
    );
}

export default DetailedTweet;
