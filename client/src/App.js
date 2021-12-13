import React, { useState } from 'react';
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

const App = () => {

  const [activeUser, setActiveUser] = useState([]);

  const handleSetActiveUser = (user) => {
    setActiveUser(user);
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

  const handleDeleteTweet = (tweetId) => {
    axios.delete(`http://localhost:5000/api/tweets/${tweetId}`, { userId: activeUser._id })
      .then(res => console.log(res))
      .catch(err => console.log(err));
    axios.get(`http://localhost:5000/api/users/active/${activeUser._id}`)
      .then(res => setActiveUser(res.data))
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
              handleDeleteTweet={handleDeleteTweet}
            />
          }
        />
        <Route path="/compose/tweet" element={<NewTweet handleNewTweet={handleNewTweet} />} />
        <Route path="/explore" element={<Explore activeUser={activeUser} />} />
        <Route path="/notifications" element={<Notifications activeUser={activeUser} />} />
        <Route path="/messages" element={<Messages activeUser={activeUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
