// src/layout/Navbar.js
import React from 'react';
import '../styles/Navbar.css';
import headerBg from '../assets/images/Header-bg.svg';
import projectLogo from '../assets/images/Logo.svg';
import logout1 from '../assets/images/Logout.svg';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ pageName, toggleSidebar }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='nav-container'>
      <img className='header-img' src={headerBg} alt='Header Background' />
      <div className='nav-list'>
        <div className='gap-3'>
          <span>{'<'}</span>
          <span>{pageName}</span>
        </div>
        <div className='logo-container'>
          <img src={projectLogo} alt='project-logo' className='project-logo' />
        </div>
        <div className='logout-container' onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <img src={logout1} alt='logout' className='navbar-logout' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
