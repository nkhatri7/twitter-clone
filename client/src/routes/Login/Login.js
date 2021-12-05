import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import './Login.scss';
import AuthHeader from '../../components/AuthHeader/AuthHeader';

const Login = ({ handleSetActiveUser }) => {

    const [userLoginDetail, setUserLoginDetail] = useState('');
    const [password, setPassword] = useState('');
    const [disabled, setDisabled] = useState(true);

    const userLoginDetailElement = useRef();
    const userLoginDetailErrorMessage = useRef();
    const passwordElement = useRef();
    const passwordErrorMessage = useRef();

    const navigate = useNavigate();

    const handleForgotPassword = () => {
        navigate('/forgot-password');
    }

    const handleUserLoginDetailChange = e => {
        setUserLoginDetail(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    useEffect(() => {
        if (userLoginDetail.trim() === '' || password.trim() === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [userLoginDetail, password]);

    const handleLogin = e => {
        e.preventDefault();

        const user = {
            userLoginDetail: userLoginDetail,
            password: password
        };

        axios.post('http://localhost:5000/api/auth/login', user)
            .then(res => {
                if (res.status === 200) {
                    userLoginDetailElement.current.style.border = '1px solid #303237';
                    userLoginDetailErrorMessage.current.style.display = 'none';
                    passwordElement.current.style.border = '1px solid #303237';
                    passwordErrorMessage.current.style.display = 'none';

                    const user = res.data;
                    handleSetActiveUser(user);
                    navigate('/home');
                }
            }).catch(err => {
                if (err.response.status === 404) {
                    userLoginDetailElement.current.style.border = '1px solid red';
                    userLoginDetailErrorMessage.current.style.display = 'block';
                    passwordElement.current.style.border = '1px solid #303237';
                    passwordErrorMessage.current.style.display = 'none';
                } else if (err.response.status === 406) {
                    userLoginDetailElement.current.style.border = '1px solid #303237';
                    userLoginDetailErrorMessage.current.style.display = 'none';
                    passwordElement.current.style.border = '1px solid red';
                    passwordErrorMessage.current.style.display = 'block';
                } else {
                    console.log('Unknown error');
                }
            });
    }

    return (
        <div className="login">
            <div className="login-wrapper">
                <AuthHeader />
                <main>
                    <h1>Sign in to Twitter</h1>
                    <form onSubmit={handleLogin}>
                        <input type="text" name="userLoginDetail" placeholder="Username or email" 
                            value={userLoginDetail} onChange={handleUserLoginDetailChange} tabIndex={0}
                            ref={userLoginDetailElement} />
                        <span className="error-message" ref={userLoginDetailErrorMessage}>Invalid username or email.</span>
                        <input type="password" name="password" placeholder="Password" value={password}
                            onChange={handlePasswordChange} tabIndex={1} ref={passwordElement} />
                        <span className="error-message" ref={passwordErrorMessage}>Incorrect password.</span>
                        <input type="submit" value="Sign In" disabled={disabled} tabIndex={3} />
                    </form>
                    <button className="forgot-password-btn" onClick={handleForgotPassword}>Forgot Password?</button>
                    <div className="no-account">
                        Don't have an account?&nbsp;
                        <Link to='/signup' className="signup-link">Sign up</Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Login;
