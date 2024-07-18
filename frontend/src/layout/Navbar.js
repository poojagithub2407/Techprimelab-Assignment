import React from 'react';
import '../styles/Navbar.css';
import headerBg from '../assets/images/Header-bg.svg';
import projectLogo from '../assets/images/Logo.svg';
import logout1 from '../assets/images/Logout.svg';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ pageName }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className='nav-container'>
      <img className='header-img' src={headerBg} alt='Header Background' />
      <div className='nav-list'>
        <div onClick={handleBack} style={{ cursor: 'pointer' }}>
          <span className='sign'>{'<'}</span>
          <span className='space'>{pageName}</span>
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
