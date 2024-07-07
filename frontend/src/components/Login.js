import React, { useState } from 'react';
import '../styles/Login.css';

import loginBg from '../assets/images/login-bg-1.svg';
import logo from '../assets/images/Logo.svg';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        const errors = {};

        if (!email.trim()) {
            errors.email = 'Email is required';
        } else {
            errors.email = '';
        }

        if (!password.trim()) {
            errors.password = 'Password is required';
        } else {
            errors.password = '';
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with login logic
            console.log('Form is valid');
        } else {
            console.log('Form is invalid');
        }
    };

    return (
        <div className="login-page">
            <img className="login-header" src={loginBg} alt="Header background" />
            <div className="login-branding">
                <img className="login-logo" src={logo} alt="Company Logo" />
                <p className="login-title">Online Project Management</p>
            </div>
            <div className='login-container'>
                <p className='login-heading'>Login to get started</p>
                <div className='login-form p-4'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group mt-3'>
                            <label className='form-label' htmlFor="email">Email</label>
                            <input
                                type='email'
                                id='email'
                                className={`form-control p-3 ${errors.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="password">Password</label>
                            <div className="input-group">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`form-control p-3 ${errors.password ? 'is-invalid' : ''}`}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <div className="input-icon" onClick={togglePasswordVisibility}>
                                    <i className={showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'}></i>
                                </div>
                            </div>
                            {errors.password && <div className="invalid">{errors.password}</div>}
                            <div className='forgot-password'>Forgot password?</div>
                        </div>
                        <div className='form-group mt-4'>
                            <button type="submit" className='login-button'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
