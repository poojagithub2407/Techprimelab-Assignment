import React, { useState, useContext } from 'react';
import axios from 'axios';
import '../styles/Login.css';
import loginBg from '../assets/images/login-bg-1.svg';
import logo from '../assets/images/Logo.svg';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the Auth context

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use the login function from the context

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
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            });

            const { data } = response;
            if (data.result === 'no user found') {
                setLoginMessage('Invalid Credentials.');
                resetForm();
            } else {
                console.log('Login successful:', data);
                login(data.token);

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
                            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                            <div className='forgot-password'>Forgot password?</div>
                        </div>
                        <div className='form-group mt-4'>
                            <button type="submit" className='login-button'>Login</button>
                            {loginMessage && <div className="text-danger mt-2">{loginMessage}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
