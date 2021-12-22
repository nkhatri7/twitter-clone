import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserNetwork from '../../components/UserNetwork/UserNetwork';

const Followers = ({ activeUser, handleFollow, handleUnfollow }) => {

    const { username } = useParams();
    const [followers, setFollowers] = useState(null);
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
            if (user.followers.length > 0) {
                axios.get(`http://localhost:5000/api/users/${user._id}/followers`)
                    .then(res => setFollowers(res.data))
                    .catch(err => console.log(err));
            } else {
                setFollowers([]);
            }
        }
    }, [user]);

    return (
        <div className='network-followers'>
            <UserNetwork 
                activeUser={activeUser} 
                user={user} 
                activeTab="Followers" 
                users={followers ? followers : []} 
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
            />
        </div>
    );
}

export default Followers;
