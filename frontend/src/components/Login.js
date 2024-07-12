import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import loginBg from '../assets/images/login-bg-1.svg';
import logo from '../assets/images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../api/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const errors = {};

        if (!email.trim()) {
            errors.email = 'Email is required';
        }
        if (!password.trim()) {
            errors.password = 'Password is required';
        }

        setErrors(errors);
        return Object.values(errors).every(error => error === '');
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/users/login`, {
                email,
                password
            });

            const { data } = response;
            if (data.result === 'no user found') {
                setLoginMessage('Invalid Credentials.');
                resetForm();
            } else {
                console.log('Login successful:', data);
                localStorage.setItem('token', JSON.stringify(data.token));

                navigate('/');

                setLoginMessage('');
                resetForm();
            }
        } catch (error) {
            console.error('Login error:', error);
            setLoginMessage('Invalid Credentials.');
            resetForm();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            await handleLogin();
        } else {
            console.log('Form is invalid');
        }
    };

    const resetForm = () => {
        setEmail('');
        setPassword('');
        setErrors({});
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        setLoginMessage('');
        setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setLoginMessage('');
        setErrors(prevErrors => ({ ...prevErrors, password: '' }));
    };

    return (
        <div className="login-page">
            <img className="login-header"
                src={loginBg}
                alt="Header background" />
            <div className="login-branding">
                <img className="login-logo"
                    src={logo}
                    alt="Company Logo" />
                <p className="login-title">Online Project Management</p>
            </div>
            <div className='login-container'>
                <p className='login-heading'>Login to get started</p>
                <div className='login-form p-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label className={`form-label ${errors.email ? 'label-error' : ''}`} htmlFor="email">Email</label>
                            <input
                                type='email'
                                id='email'
                                className={`form-control ${errors.email ? 'invalid' : ''}`}
                                value={email}
                                onChange={handleEmailChange} 
                            />
                            {errors.email &&
                                <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group mt-3">
                        <label className={`form-label ${errors.password ? 'label-error' : ''}`} htmlFor="password">Password</label>
                        <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control ${errors.password ? 'invalid' : ''}`}
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange} 
                                />
                                <div className="input-icon" onClick={togglePasswordVisibility}>
                                    <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}></i>
                                </div>
                            </div>
                            {errors.password &&
                                <div className="invalid-feedback">{errors.password}</div>}
                            <div className='forgot-password'>Forgot password?</div>
                        </div>
                        <div className='form-group mt-4'>
                            <button type="submit" className='login-button'>Login</button>
                            {loginMessage && <div className="text-danger mt-2"
                                style={{ textAlign: 'center' }}
                            >{loginMessage}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
