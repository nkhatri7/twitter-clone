import React from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../MobileFooterMenu/MobileFooterMenu';
import UserPreview from '../UserPreview/UserPreview';
import './UserNetwork.scss';

const UserNetwork = ({ activeUser, user, activeTab, users, handleFollow, handleUnfollow }) => {

    const navigate = useNavigate();

    return (
        <div className='user-network'>
            <div className="user-network-header">
                <div className="back" aria-label='Go back' onClick={() => navigate(-1)}>
                    <span className="hidden">Back</span>
                </div>
                <div className="user-network-header-content">
                    <span className="user-name">{user ? user.displayName : ''}</span>
                    <span className="user-username">@{user ? user.username : ''}</span>
                </div>
            </div>
            <div className="user-network-main">
                <DesktopMenu activeUser={activeUser} page={activeTab} />
                <div className="network-toggle-container">
                    <button 
                        className={`network-toggle-btn ${activeTab === 'Followers' ? 'active-tab' : ''}`}
                        onClick={() => navigate(`/${user.username}/followers`)}
                    >
                        Followers
                    </button>
                    <button 
                        className={`network-toggle-btn ${activeTab === 'Following' ? 'active-tab' : ''}`}
                        onClick={() => navigate(`/${user.username}/following`)}
                    >
                        Following
                    </button>
                </div>
                {activeUser ? [...users].reverse().map(user => {
                    return <UserPreview 
                        key={user._id} 
                        activeUser={activeUser} 
                        user={user} 
                        handleFollow={handleFollow} 
                        handleUnfollow={handleUnfollow} 
                        />
                }): null}
            </div>
            <MobileFooterMenu page={activeTab} />
        </div>
    );
}

export default UserNetwork;
