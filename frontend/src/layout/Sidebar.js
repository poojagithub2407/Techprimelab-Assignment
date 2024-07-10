// src/layout/Sidebar.js
import React, { useState, useContext } from 'react';
import '../styles/Sidebar.css';
import dashboard from '../assets/images/Dashboard.svg';
import dashboardActive from '../assets/images/Dashboard-active.svg';
import createProject from '../assets/images/create-project.svg';
import createProjectActive from '../assets/images/create-project-active.svg';
import projectList from '../assets/images/Project-list.svg';
import projectListActive from '../assets/images/Project-list-active.svg';
import logout1 from '../assets/images/logout-1.svg';
import Navbar from './Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [pageName, setPageName] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handlePageChange = (newPage) => {
    setPageName(newPage);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  };

  

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="main-container">
          <Link to="/" onClick={() => handlePageChange('Dashboard')}>
            <img
              className="dash-img"
              src={pageName === 'Dashboard' ? dashboardActive : dashboard}
              alt="Dashboard"
              style={{ cursor: 'pointer' }}
            />
          </Link>
          <Link to="/create-project" onClick={() => handlePageChange('Create Project')}>
            <img
              className="create-img"
              src={pageName === 'Create Project' ? createProjectActive : createProject}
              alt="Create Project"
              style={{ cursor: 'pointer' }}
            />
          </Link>
          <div className='border'/>
          <Link to="/project-list" onClick={() => handlePageChange('Project List')}>
            <img
              className="project-img"
              src={pageName === 'Project List' ? projectListActive : projectList}
              alt="Project List"
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </div>
        <div className="logout-container" onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <img className="sidebar-logout" src={logout1} alt="Log Out" />
        </div>
      </div>
      <Navbar pageName={pageName}/>
    </div>
  );
};

export default Sidebar;
