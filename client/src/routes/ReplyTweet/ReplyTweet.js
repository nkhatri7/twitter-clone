import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import ComposeTweetHeader from '../../components/ComposeTweetHeader/ComposeTweetHeader';
import './ReplyTweet.scss';
import profilePic from '../../assets/images/default-profile-pic.png';
import ComposeTweetMain from '../../components/ComposeTweetMain/ComposeTweetMain';
import DesktopMenu from '../../components/DesktopMenu/DesktopMenu';

const ReplyTweet = ({ activeUser, handleReply }) => {

    const [replyText, setReplyText] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [tweet, setTweet] = useState(null);
    const [user, setUser] = useState(null);
    const { tweetId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/tweets/${tweetId}`)
            .then(res => setTweet(res.data))
            .catch(err => console.log(err));
    }, [tweetId]);

    useEffect(() => {
        if (tweet) {
            axios.get(`http://localhost:5000/api/users/${tweet.userId}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err));
        }
    }, [tweet]);

    const displayDate = () => {
        const tweetTime = new Date(tweet.createdAt);
        const difference = (Date.now() - tweetTime) / (1000 * 60);
        
        if (difference < 1) {
            return `${(difference * 60).toFixed(0)}s`;
        } else if (difference < 60) {
            return `${difference.toFixed(0)}m`;
        } else if (difference < 1440) {
            return `${(difference / 60).toFixed(0)}h`;
        } else if (difference < 10080) {
            return `${(difference / (60 * 24)).toFixed(0)}d`;
        } else {
            return tweetTime.toLocaleDateString('en-AU');
        }
    }

    const handleSetDisabled = (boolean) => {
        setDisabled(boolean)
    }

    const handleSetReplyText = (val) => {
        setReplyText(val);
    }

    return (
        <div className="reply-tweet">
            <ComposeTweetHeader disabled={disabled} handleReply={handleReply} type={'Reply'} tweetId={tweetId} text={replyText} />
            <main className="reply-tweet-main">
                <DesktopMenu activeUser={activeUser} page="Reply Tweet" />
                <div className="tweet">
                    <img className="tweet-profile-pic" src={profilePic} alt="" />
                    <div className="main-tweet-content">
                        <div className="tweet-header">
                            <div className="tweet-header-main-container">
                                <div className="tweet-header-main">
                                    <span className="tweet-user-name">{user ? user.displayName : ''}</span>
                                    <span className="tweet-user-username">{user ? `@${user.username}` : ''}</span>
                                    <div className="separator"></div>
                                    <span className="tweet-time">{tweet ? displayDate() : ''}</span>
                                </div>
                            </div>
                        </div>
                        <div className="tweet-main">{tweet ? tweet.text : ''}</div>
                        <div className="reply-info">
                            {user ? <p>Replying to <span>@{user.username}</span></p> : null}
                        </div>
                    </div>
                </div>
                <ComposeTweetMain 
                    text={replyText}
                    handleSetDisabled={handleSetDisabled}
                    handleSetText={handleSetReplyText}
                    placeholder={'Tweet your reply'}
                />
                <div className="connecting-line"></div>
            </main>
        </div>
    );
}

export default ReplyTweet;
