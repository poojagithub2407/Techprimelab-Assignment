import React from 'react';
import '../styles/Navbar.css';
import headerBg from '../assets/images/Header-bg.svg';
import projectLogo from '../assets/images/Logo.svg';
import logout1 from '../assets/images/Logout.svg';

const Navbar = ({ pageName }) => {
  return (
    <div className='nav-container'>
      <img className='header-img' src={headerBg} alt='Header Background' />
      <div className='nav-list'>
        <div>{pageName}</div>
        <div className='logo-container'>
          <img src={projectLogo} alt='project-logo' className='project-logo' />
        </div>
        <div className='logout-container'>
          <img src={logout1} alt='logout' className='navbar-logout' />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
