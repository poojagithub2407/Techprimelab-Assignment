import React, { useState } from 'react';
import '../styles/Sidebar.css';
import dashboard from '../assets/images/Dashboard.svg';
import dashboardActive from '../assets/images/Dashboard-active.svg';
import createProject from '../assets/images/create-project.svg';
import createProjectActive from '../assets/images/create-project-active.svg';
import projectList from '../assets/images/Project-list.svg';
import projectListActive from '../assets/images/Project-list-active.svg';
import logout from '../assets/images/logout-1.svg';
import Navbar from '../layout/Navbar';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [pageName, setPageName] = useState('');

  const handlePageChange = (newPage) => {
    setPageName(newPage);
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
          <Link to="/project-list" onClick={() => handlePageChange('Project List')}>
            <img
              className="project-img"
              src={pageName === 'Project List' ? projectListActive : projectList}
              alt="Project List"
              style={{ cursor: 'pointer' }}
            />
          </Link>
        </div>
        <div className="logout-container">
          <Link to="/login">
            <img className="sidebar-logout" src={logout} alt="Log Out" style={{ cursor: 'pointer' }} />
          </Link>
        </div>
      </div>
      <Navbar pageName={pageName} />
    </div>
  );
};

export default Sidebar;
