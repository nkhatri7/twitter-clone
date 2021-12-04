import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Base from './routes/Base/Base';
import Home from './routes/Home/Home';
import Login from './routes/Login/Login';
import SignUp from './routes/SignUp/SignUp';

const App = () => {

  const [activeUser, setActiveUser] = useState([]);

  const handleCompletedSignup = (user) => {
    setActiveUser(user);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/signup" element={<SignUp handleCompletedSignup={handleCompletedSignup} />} />
        <Route path="/login" element={<Login />} />
        <Route path='/home' element={<Home activeUser={activeUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
