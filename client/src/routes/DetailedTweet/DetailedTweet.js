import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import './DetailedTweet.scss';
import profilePic from '../../assets/images/default-profile-pic.png';
import MobileFooterMenu from '../../components/MobileFooterMenu/MobileFooterMenu';
import TweetOptions from '../../components/TweetOptions/TweetOptions';
import Overlay from '../../components/Overlay/Overlay';
import TweetFooter from '../../components/TweetFooter/TweetFooter';
import Tweet from '../../components/Tweet/Tweet';

const DetailedTweet = ({ activeUser, handleLike, handleUnlike, handleRetweet, handleRemoveRetweet, handleDeleteTweet }) => {

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

    const handleTweetOptionsEvent = (tweet) => {
        setTweetOptions(tweet);
        handleOptionsView();
    }

    const handleOptionsView = () => {
        setOptionsDisplay(display => !display);
    }

    const tweetTime = () => {
        const tweetDateTime = new Date(tweet.createdAt);
        if (tweetDateTime.getHours() > 12) {
            return `${tweetDateTime.getHours() - 12}:${tweetDateTime.getMinutes()} PM`;
        } else {
            return `${tweetDateTime.getHours()}:${tweetDateTime.getMinutes()} AM`;
        }
    }

    const tweetDate = () => {
        const tweetDateTime = new Date(tweet.createdAt);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return `${tweetDateTime.getDate()} ${months[tweetDateTime.getMonth()]} ${tweetDateTime.getFullYear()}`;
    }

    const handleReplyInputChange = (e) => {
        setReplyText(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        if (e.target.value === '') {
            e.target.style.height = '63px';
        }
    }

    const repliesDisplay = replies.map(reply => {
        const replyUser = replyUsers.find(user => user._id === reply.userId);

        return (
            <Tweet 
                key={reply._id}
                tweet={reply}
                user={replyUser? replyUser : {}}
                activeUser={activeUser}
                handleLike={handleLike}
                handleUnlike={handleUnlike}
                handleRetweet={handleRetweet}
                handleRemoveRetweet={handleRemoveRetweet}
                handleTweetOptions={handleTweetOptionsEvent}
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
                <div className="tweet-header">
                    <div className="tweet-header-main">
                        <img src={profilePic} alt="" className="profile-pic" />
                        <div className="user-details">
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
                <div className="tweet-footer-container">
                    {tweet ? <TweetFooter 
                        tweet={tweet ? tweet : null}
                        activeUser={activeUser} 
                        handleLike={handleLike} 
                        handleUnlike={handleUnlike} 
                        handleRetweet={handleRetweet} 
                        handleRemoveRetweet={handleRemoveRetweet}
                    /> : null}
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
                            <button className="reply-btn" disabled={disabled}>Reply</button> 
                        : null}
                    </div>
                </div>
                {replyUsers.length > 0 ? repliesDisplay : null}
                {optionsDisplay === false ? null :
                    <TweetOptions 
                        handleOptionsView={handleOptionsView} 
                        tweet={tweetOptions} 
                        handleDeleteTweet={handleDeleteTweet}
                    />
                }
                {optionsDisplay ? <Overlay /> : null}
            </main>
            <MobileFooterMenu page="tweet" />
        </div>
    );
}

export default DetailedTweet;
