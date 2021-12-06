import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/signup" element={<SignUp handleSetActiveUser={handleSetActiveUser} />} />
        <Route path="/login" element={<Login handleSetActiveUser={handleSetActiveUser} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/home" element={<Home activeUser={activeUser} />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
}

export default App;
