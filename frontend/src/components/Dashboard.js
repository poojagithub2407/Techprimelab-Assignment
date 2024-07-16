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
        const responses = await Promise.all([
          axios.get(`${BASE_URL}/projects/count/total`).then(res => res.data),
          axios.get(`${BASE_URL}/projects/count/closed`).then(res => res.data),
          axios.get(`${BASE_URL}/projects/count/running`).then(res => res.data),
          axios.get(`${BASE_URL}/projects/count/overdue-running`).then(res => res.data),
          axios.get(`${BASE_URL}/projects/count/cancelled`).then(res => res.data)
        ]);

        const [total, closed, running, overdue, cancelled] = responses;

        setCounts({
          totalProjects: total.totalProjects,
          closedProjects: closed.closedProjects,
          runningProjects: running.runningProjects,
          overdueRunningProjects: overdue.overdueRunningProjects,
          cancelledProjects: cancelled.cancelledProjects
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
        <div className=" box-container d-flex justify-content-between">
          <div className="box">
              <small  style={{color:'gray'}}>Total Projects</small>
              <p style={{ fontWeight: 'bold' }}>{counts.totalProjects}</p>
          </div>
          <div className="box">
              <small style={{color:'gray'}}>Closed</small>
              <p style={{ fontWeight: 'bold' }}>{counts.closedProjects}</p>
          </div>
          <div className="box">
              <small style={{color:'gray'}}>Running</small>
              <p style={{ fontWeight: 'bold' }}>{counts.runningProjects}</p>
          </div>
          <div className="box">
              <small style={{color:'gray'}}>Overdue Running</small>
              <p style={{ fontWeight: 'bold' }}>{counts.overdueRunningProjects}</p>
          </div>
          <div className="box">
              <small>Cancelled</small>
              <p style={{ fontWeight: 'bold' }}>{counts.cancelledProjects}</p>
          </div>
        </div>
        <div>
          <p className='closed'>
            Department wise -Total Vs Closed
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
