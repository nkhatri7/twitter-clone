import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './SignUp.scss';
import twitterLogo from '../../assets/images/twitter-logo.png';

const SignUp = ({ handleCompletedSignup }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [nextDisabled, setNextDisabled] = useState(true);
    const [signupDisabled, setSignupDisabled] = useState(true);

    const emailElement = useRef();
    const emailErrorMessage = useRef();
    const usernameElement = useRef();
    const usernameErrorMessage = useRef();
    const confirmedPasswordElement = useRef();
    const confirmedPasswordErrorMessage = useRef();

    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    }

    const handleEmailChange = e => {
        setEmail(e.target.value);
    }

    const handleNameChange = e => {
        setName(e.target.value);
    }

    const handleUsernameChange = e => {
        setUsername(e.target.value);
    }

    const handlePasswordChange = e => {
        setPassword(e.target.value);
    }

    const handleConfirmedPasswordChange = e => {
        setConfirmedPassword(e.target.value);
    }

    useEffect(() => {
        if (name.trim() === '' || email.trim() === '') {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }, [name, email]);

    useEffect(() => {
        if (username.trim() === '' || password.trim() === '' || confirmedPassword.trim() === '') {
            setSignupDisabled(true);
        } else {
            setSignupDisabled(false);
        }
    }, [username, password, confirmedPassword]);
    
    const handleEmailValidation = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/auth/signup/email', { email: email })
            .then(res => {
                if (res.status === 200) {
                    emailErrorMessage.current.style.display = 'none';
                    emailElement.current.style.border = '1px solid #303237';
                    setEmailAvailable(true);
                    usernameElement.current.focus();
                } else {
                    console.log('Unknown error');
                }
            }).catch(err => {
                if (err.response.status === 403) {
                    emailErrorMessage.current.style.display = 'block';
                    emailElement.current.style.border = '1px solid red';
                }
            });
    }

    const handleSignUp = e => {
        e.preventDefault();
        if (password !== confirmedPassword) {
            confirmedPasswordErrorMessage.current.style.display = 'block';
            confirmedPasswordElement.current.style.border = '1px solid red';
        } else {
            confirmedPasswordErrorMessage.current.style.display = 'none';
            confirmedPasswordElement.current.style.border = '1px solid #303237';

            const user = {
                email: email,
                username: username,
                password: password,
                displayName: name
            };
            
            axios.post('http://localhost:5000/api/auth/signup', user)
                .then(async res => {
                    if (res.status === 200) {
                        usernameErrorMessage.current.style.display = 'none';
                        usernameElement.current.style.border = '1px solid #303237';
                        
                        const user = await res.data;
                        handleCompletedSignup(user);
                        navigate('/home');
                    }
                }).catch(err => {
                    if (err.response.status === 403) {
                        usernameErrorMessage.current.style.display = 'block';
                        usernameElement.current.style.border = '1px solid red';
                    }
                });
        }
    }

    return (
        <div className="signup">
            <div className="signup-wrapper">
                <header>
                    <button className="close" aria-label="Go back to previous screen" onClick={handleClose}>
                        <span className="hidden">Back</span>
                    </button>
                    <img src={twitterLogo} alt="Twitter logo" className="logo" />
                </header>
                <main>
                    <h1>Create your account</h1>
                    {emailAvailable === false ? 
                        <form onSubmit={handleEmailValidation}>
                            <input type="text" name="displayName" id="displayName" placeholder="Name" 
                                value={name} onChange={handleNameChange} tabIndex={0} />
                            <input type="email" name="email" id="email" placeholder="Email" 
                                value={email} onChange={handleEmailChange} ref={emailElement} tabIndex={1} />
                            <span className="error-message" ref={emailErrorMessage}>Email has already been taken.</span>
                            <input className="next-btn" type="submit" value="Next" disabled={nextDisabled} tabIndex={2} />
                        </form>  
                        :
                        <form onSubmit={handleSignUp}>
                            <input type="text" name="username" id="username" placeholder="Username" 
                                value={username} onChange={handleUsernameChange} ref={usernameElement} tabIndex={3} />
                            <span className="error-message" ref={usernameErrorMessage}>Username already taken.</span>
                            <input type="password" name="password" id="password" placeholder="Password" 
                                value={password} onChange={handlePasswordChange} tabIndex={4} />
                            <input type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" 
                                value={confirmedPassword} onChange={handleConfirmedPasswordChange} ref={confirmedPasswordElement}
                                tabIndex={5} />
                            <span className="error-message" ref={confirmedPasswordErrorMessage}>Passwords do not match.</span>
                            <input className="signup-btn" type="submit" value="Sign Up" disabled={signupDisabled} tabIndex={6} />
                        </form>
                    }
                </main>
            </div>
        </div>
    );
}

export default SignUp;
