import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import DetailedTweetInfo from '../../components/DetailedTweetInfo/DetailedTweetInfo';

const DetailedTweetRetweets = ({ activeUser, handleFollow, handleUnfollow }) => {

    const { tweetId } = useParams();
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/tweets/${tweetId}/retweets`)
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, [tweetId]);

    return (
        <div className='detailed-tweet-retweets'>
            <DetailedTweetInfo 
                activeUser={activeUser} 
                users={users ? users : []} 
                handleFollow={handleFollow} 
                handleUnfollow={handleUnfollow}
                page="Retweets"
            />
        </div>
    );
}

export default DetailedTweetRetweets;
