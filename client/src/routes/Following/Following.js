import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserNetwork from '../../components/UserNetwork/UserNetwork';

const Following = ({ activeUser, handleFollow, handleUnfollow }) => {

    const { username } = useParams();
    const [following, setFollowing] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (activeUser) {
            if (activeUser.username === username) {
                setUser(activeUser);
            } else {
                axios.get(`http://localhost:5000/api/users/username/${username}`)
                    .then(res => setUser(res.data))
                    .catch(err => console.log(err));
            }
        }
    }, [activeUser, username]);

    useEffect(() => {
        if (user) {
            if (user.following.length > 0) {
                axios.get(`http://localhost:5000/api/users/${user._id}/following`)
                    .then(res => setFollowing(res.data))
                    .catch(err => console.log(err));
            } else {
                setFollowing([]);
            }
        }
    }, [user]);

    
    
    return (
        <div className='network-following'>
            <UserNetwork 
                activeUser={activeUser} 
                user={user} 
                activeTab="Following" 
                users={following ? following : []} 
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
            />
        </div>
    );
}

export default Following;
