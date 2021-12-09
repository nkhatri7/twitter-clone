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

const App = () => {

  const [activeUser, setActiveUser] = useState([]);

  const handleSetActiveUser = (user) => {
    setActiveUser(user);
  }

  const handleLike = (tweetId) => {
    axios.put(`http://localhost:5000/api/tweets/${tweetId}/like`, { userId: activeUser._id })
      .then(res => setActiveUser(res.data.user))
      .catch(err => console.log(err));
  }

  const handleUnlike = (tweetId) => {
    axios.put(`http://localhost:5000/api/tweets/${tweetId}/unlike`, { userId: activeUser._id })
      .then(res => setActiveUser(res.data.user))
      .catch(err => console.log(err));
  }

  const handleRetweet = (tweetId) => {
    axios.put(`http://localhost:5000/api/tweets/${tweetId}/retweet`, { userId: activeUser._id })
      .then(res => setActiveUser(res.data.user))
      .catch(err => console.log(err));
  }

  const handleRemoveRetweet = (tweetId) => {
    axios.put(`http://localhost:5000/api/tweets/${tweetId}/retweet/remove`, { userId: activeUser._id })
      .then(res => setActiveUser(res.data.user))
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
            />
          } 
        />
        <Route path="/explore" element={<Explore activeUser={activeUser} />} />
        <Route path="/notifications" element={<Notifications activeUser={activeUser} />} />
        <Route path="/messages" element={<Messages activeUser={activeUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
