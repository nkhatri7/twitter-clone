import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Base from './routes/Base/Base';
import ForgotPassword from './routes/ForgotPassword/ForgotPassword';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
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
        <Route path='/home' element={<Home activeUser={activeUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
