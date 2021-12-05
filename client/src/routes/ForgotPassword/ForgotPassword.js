import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.scss';
import AuthHeader from '../../components/AuthHeader/AuthHeader';

const ForgotPassword = () => {

    const [userDetail, setUserDetail] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [emailSent, setEmailSent] = useState(false);

    const userDetailElement = useRef();
    const userDetailErrorMessage = useRef();

    const handleUserDetailChange = e => {
        setUserDetail(e.target.value);
    }

    useEffect(() => {
        if (userDetail.trim() === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [userDetail]);

    const handlePasswordReset = e => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/auth/forgot-password', { userDetail: userDetail })
            .then(res => {
                if (res.status === 200) {
                    userDetailElement.current.style.border = '1px solid #303237';
                    userDetailErrorMessage.current.style.display = 'none';
                    setEmailSent(true);
                }
            }).catch(err => {
                if (err.response.status === 404) {
                    userDetailElement.current.style.border = '1px solid red';
                    userDetailErrorMessage.current.style.display = 'block';
                } else {
                    console.log('Unknown error');
                }
            });
    }

    return (
        <div className="forgot-password">
            <div className="forgot-password-wrapper">
                <AuthHeader />
                <main>
                    <h1>Forgot Password</h1>
                    <form onSubmit={handlePasswordReset}>
                        <input type="text" name="user" placeholder="Enter username or email" value={userDetail}
                            onChange={handleUserDetailChange} ref={userDetailElement} />
                        <span className="error-message" ref={userDetailErrorMessage}>Invalid email or username.</span>
                        <input type="submit" value="Send Reset Link" disabled={disabled} />
                    </form>
                    {emailSent === false ? null :
                        <span className="email-sent">
                            An email with the password reset link has been sent to your email address.
                        </span>
                    }
                    <div className="no-account">
                        Don't have an account?&nbsp;
                        <Link to='/signup' className="signup-link">Sign up</Link>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ForgotPassword;
