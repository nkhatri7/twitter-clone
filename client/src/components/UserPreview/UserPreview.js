import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UserPreview.scss';
import profilePic from '../../assets/images/default-profile-pic.png';

const UserPreview = ({ activeUser, user, handleFollow, handleUnfollow }) => {

    const navigate = useNavigate();

    const handleFollowEvent = () => {
        if (activeUser.following.includes(user._id)) {
            handleUnfollow(user._id);
        } else {
            handleFollow(user._id);
        }
    }

    return (
        <div className='user-preview'>
            <img src={profilePic} alt="" className="user-preview-profile-pic" onClick={() => navigate(`/${user.username}`)} />
            <div className="user-preview-container">
                <div className="user-preview-header">
                    <div className="user-preview-header-text" onClick={() => navigate(`/${user.username}`)}>
                        <span className="user-name">{user ? user.displayName : ''}</span>
                        <div className="user-username-container">
                            <span className="user-username">@{user ? user.username : ''}</span>
                            {activeUser && user ? (activeUser.followers.includes(user._id)) ? 
                                <div className="follows-you-tag">Follows you</div> : null : null
                            }
                        </div>
                    </div>
                    {activeUser && user ? (activeUser._id === user._id) ? null : 
                        <button 
                            className={activeUser && user 
                                ? (activeUser.following.includes(user._id)) ? 'following-btn' : 'follow-btn' 
                                : ''
                            }
                            onClick={handleFollowEvent}
                        >
                            {activeUser && user ? (activeUser.following.includes(user._id)) ? 'Following' : 'Follow' : ''}
                        </button>
                        : null
                    }
                </div>
                <div className="user-preview-main" onClick={() => navigate(`/${user.username}`)}>
                        {user && user.bio.length > 0 ? user.bio : ''}
                </div>
            </div>
        </div>
    );
}

export default UserPreview;
