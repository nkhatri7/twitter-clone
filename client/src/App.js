import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.scss';
import Base from './routes/Base/Base';
import Explore from './routes/Explore/Explore';
import ForgotPassword from './routes/ForgotPassword/ForgotPassword';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import Messages from './routes/Messages/Messages';
import Notifications from './routes/Notifications/Notifications';
import SignUp from './routes/SignUp/SignUp';
import NewTweet from './routes/NewTweet/NewTweet';
import DetailedTweet from './routes/DetailedTweet/DetailedTweet';
import ReplyTweet from './routes/ReplyTweet/ReplyTweet';
import Profile from './routes/Profile/Profile';
import ProfileSettings from './routes/ProfileSettings/ProfileSettings';
import Settings from './routes/Settings/Settings';
import AccountSettings from './routes/AccountSettings/AccountSettings';
import ChangePassword from './routes/ChangePassword/ChangePassword';
import DeactivateAccount from './routes/DeactivateAccount/DeactivateAccount';
import AccountInformation from './routes/AccountInformation/AccountInformation';

const App = () => {

  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    if (localStorage.getItem('activeUser')) {
      setActiveUser(JSON.parse(localStorage.getItem('activeUser')));
    }
  }, []);

  useEffect(() => {
    if (activeUser) {
      localStorage.setItem('activeUser', JSON.stringify(activeUser));
    }
  }, [activeUser]);

  const handleSetActiveUser = (user) => {
    setActiveUser(user);
  }

  const handleUpdateProfile = (name, bio) => {
    const body = {
      displayName: name,
      bio: bio
    };

    axios.put(`http://localhost:5000/api/users/${activeUser._id}`, body)
      .then(res => setActiveUser(res.data))
      .catch(err => console.log(err));
  }

  const handleChangePassword = (newPassword) => {
    axios.put(`http://localhost:5000/api/users/${activeUser._id}`, { password: newPassword })
      .then(res => setActiveUser(res.data))
      .catch(err => console.log(err));
  }

  const handleDeactivateAccount = () => {
    axios.delete(`http://localhost:5000/api/users/${activeUser._id}`)
      .then(res => {
        console.log(res);
        setActiveUser(null);
      })
      .catch(err => console.log(err));
  }

  const handleNewTweet = (tweetText) => {
    const tweet = {
      userId: activeUser._id,
      text: tweetText,
      reply: false
    };

    axios.post('http://localhost:5000/api/tweets/new', tweet)
      .then(res => setActiveUser(res.data.user))
      .catch(err => console.log(err));
  }

  const handleTweetEvent = (tweetId, action) => {
    axios.put(`http://localhost:5000/api/tweets/${tweetId}/${action}`, { userId: activeUser._id })
      .then(res => setActiveUser(res.data.user))
      .catch(err => console.log(err));
  }

  const handleLike = (tweetId) => {
    handleTweetEvent(tweetId, 'like');
  }

  const handleUnlike = (tweetId) => {
    handleTweetEvent(tweetId, 'unlike');
  }

  const handleRetweet = (tweetId) => {
    handleTweetEvent(tweetId, 'retweet');
  }

  const handleRemoveRetweet = (tweetId) => {
    handleTweetEvent(tweetId, 'retweet/remove');
  }

  const handleReply = (tweetId, tweetText) => {
    const tweet = {
      userId: activeUser._id,
      text: tweetText,
      reply: true,
      replyTo: tweetId
    }

    axios.post(`http://localhost:5000/api/tweets/${tweetId}/reply`, tweet)
      .then(res => setActiveUser(res.data.user))
      .catch(err => console.log(err));
  }

  const handleDeleteReply = (tweetId, replyId) => {
    axios.delete(`http://localhost:5000/api/tweets/${tweetId}/delete/${replyId}`)
      .catch(err => console.log(err));

    axios.get(`http://localhost:5000/api/users/active/${activeUser._id}`)
      .then(res => setActiveUser(res.data))
      .catch(err => console.log(err));
  }

  const handleDeleteTweet = (tweetId) => {
    axios.delete(`http://localhost:5000/api/tweets/${tweetId}`, { userId: activeUser._id })
      .catch(err => console.log(err));
    axios.get(`http://localhost:5000/api/users/active/${activeUser._id}`)
      .then(res => setActiveUser(res.data))
      .catch(err => console.log(err));
  }

  const handleFollowUser = (userId) => {
    axios.put(`http://localhost:5000/api/users/${userId}/follow`, { userId: activeUser._id })
      .then(res => setActiveUser(res.data.currentUser))
      .catch(err => console.log(err));
  }

  const handleUnfollowUser = (userId) => {
    axios.put(`http://localhost:5000/api/users/${userId}/unfollow`, { userId: activeUser._id })
      .then(res => setActiveUser(res.data.currentUser))
      .catch(err => console.log(err));
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/signup" element={<SignUp handleSetActiveUser={handleSetActiveUser} />} />
        <Route path="/login" element={<Login handleSetActiveUser={handleSetActiveUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route 
          path="/home" 
          element={
            <Home 
              activeUser={activeUser} 
              handleLike={handleLike} 
              handleUnlike={handleUnlike}
              handleRetweet={handleRetweet}
              handleRemoveRetweet={handleRemoveRetweet}
              handleDeleteTweet={handleDeleteTweet}
            />
          } 
        />
        <Route 
          path="/:username/status/:tweetId" 
          element={
            <DetailedTweet 
              activeUser={activeUser}
              handleLike={handleLike} 
              handleUnlike={handleUnlike}
              handleRetweet={handleRetweet}
              handleRemoveRetweet={handleRemoveRetweet}
              handleReply={handleReply}
              handleDeleteReply={handleDeleteReply}
              handleDeleteTweet={handleDeleteTweet}
            />
          }
        />
        <Route 
          path="/:username/status/:tweetId/reply"
          element={<ReplyTweet handleReply={handleReply} />}  
        />
        <Route path="/compose/tweet" element={<NewTweet handleNewTweet={handleNewTweet} />} />
        <Route 
          path="/:username" 
          element={
            <Profile 
              activeUser={activeUser}
              handleLike={handleLike} 
              handleUnlike={handleUnlike}
              handleRetweet={handleRetweet}
              handleRemoveRetweet={handleRemoveRetweet}
              handleDeleteReply={handleDeleteReply}
              handleDeleteTweet={handleDeleteTweet}
              handleFollowUser={handleFollowUser}
              handleUnfollowUser={handleUnfollowUser}
            />
          } 
        />
        <Route path="/explore" element={<Explore activeUser={activeUser} />} />
        <Route path="/notifications" element={<Notifications activeUser={activeUser} />} />
        <Route path="/messages" element={<Messages activeUser={activeUser} />} />
        <Route path="/settings" element={<Settings activeUser={activeUser} />} />
        <Route 
          path="/settings/profile" 
          element={
            <ProfileSettings 
              activeUser={activeUser} 
              handleUpdateProfile={handleUpdateProfile}
            />
          } 
        />
        <Route path="/settings/account" element={<AccountSettings activeUser={activeUser} />} />
        <Route path="/settings/your_twitter_data/account" element={<AccountInformation activeUser={activeUser} />} />
        <Route 
          path="/settings/password" 
          element={
            <ChangePassword 
              activeUser={activeUser} 
              handleChangePassword={handleChangePassword} 
            />
          } 
        />
        <Route 
          path="/settings/deactivate"
          element={
            <DeactivateAccount 
              activeUser={activeUser}
              handleDeactivateAccount={handleDeactivateAccount}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
