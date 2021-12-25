import React from 'react';
import { useNavigate } from 'react-router-dom';
import DesktopMenu from '../DesktopMenu/DesktopMenu';
import MobileFooterMenu from '../MobileFooterMenu/MobileFooterMenu';
import UserPreview from '../UserPreview/UserPreview';
import './DetailedTweetInfo.scss';

const DetailedTweetInfo = ({ activeUser, users, handleFollow, handleUnfollow, page }) => {

    const navigate = useNavigate();

    return (
        <div className='detailed-tweet-info'>
            <header className="detailed-tweet-info-header">
                <div className="back" aria-label='Go back' onClick={() => navigate(-1)}>
                    <span className="hidden">Back</span>
                </div>
                <h1>{page === 'Likes' ? 'Liked by' : 'Retweeted by'}</h1>
            </header>
            <main className="detail-tweet-info-main">
                <DesktopMenu activeUser={activeUser} page="Detailed Tweet Info" />
                <div className="users-container">
                    { activeUser ? [...users].reverse().map(user => {
                        return <UserPreview 
                            key={user._id}
                            activeUser={activeUser}
                            user={user}
                            handleFollow={handleFollow}
                            handleUnfollow={handleUnfollow}
                        />
                    }) : null }
                </div>
            </main>
            <MobileFooterMenu />
        </div>
    );
}

export default DetailedTweetInfo;
