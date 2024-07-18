import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';
import BarChart from './BarChart';
import BASE_URL from '../api/api';
import Sidebar from '../layout/Sidebar';

const Dashboard = () => {
  const [counts, setCounts] = useState({
    totalProjects: 0,
    closedProjects: 0,
    runningProjects: 0,
    overdueRunningProjects: 0,
    cancelledProjects: 0
  });

  useEffect(() => {
    const fetchProjectCounts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projects/count`);
        const data = response.data;

        setCounts({
          totalProjects: data.totalProjects || 0,
          closedProjects: data.closedProjects || 0,
          runningProjects: data.runningProjects || 0,
          overdueRunningProjects: data.overdueRunningProjects || 0,
          cancelledProjects: data.cancelledProjects || 0
        });
      } catch (error) {
        console.error('Error fetching project counts:', error);
      }
    };

    fetchProjectCounts();
  }, []);

  return (
    <>
      <Sidebar />
      <div className="container my-3">
        <div className="box-container d-flex justify-content-between">
          <div className="box">
            <small style={{ color: 'gray' }}>Total Projects</small>
            <p style={{ fontWeight: 'bold' }}>{counts.totalProjects}</p>
          </div>
          <div className="box">
            <small style={{ color: 'gray' }}>Closed</small>
            <p style={{ fontWeight: 'bold' }}>{counts.closedProjects}</p>
          </div>
          <div className="box">
            <small style={{ color: 'gray' }}>Running</small>
            <p style={{ fontWeight: 'bold' }}>{counts.runningProjects}</p>
          </div>
          <div className="box">
            <small style={{ color: 'gray' }}>Closure Delay</small>
            <p style={{ fontWeight: 'bold' }}>{counts.overdueRunningProjects}</p>
          </div>
          <div className="box">
            <small style={{ color: 'gray' }}>Cancelled</small>
            <p style={{ fontWeight: 'bold' }}>{counts.cancelledProjects}</p>
          </div>
        </div>
        <div>
          <p className='closed'>
            Department wise - Total Vs Closed
          </p>
        </div>
        <div>
          <BarChart />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
