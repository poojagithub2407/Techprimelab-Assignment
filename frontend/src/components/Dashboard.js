import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import BarChart from './BarChart';

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
          fetch('http://localhost:5000/api/projects/count/total').then(res => res.json()),
          fetch('http://localhost:5000/api/projects/count/closed').then(res => res.json()),
          fetch('http://localhost:5000/api/projects/count/running').then(res => res.json()),
          fetch('http://localhost:5000/api/projects/count/overdue-running').then(res => res.json()),
          fetch('http://localhost:5000/api/projects/count/cancelled').then(res => res.json())
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
        // Handle error fetching data
      }
    };

    fetchProjectCounts();
  }, []);

  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between">
        <div className="box mx-2">
          <div>
            <p>Total Projects</p>
            <h4>{counts.totalProjects}</h4>
          </div>
        </div>
        <div className="box mx-2">
          <div>
            <p>Closed</p>
            <h4>{counts.closedProjects}</h4>
          </div>
        </div>
        <div className="box mx-2">
          <div>
            <p>Running</p>
            <h4>{counts.runningProjects}</h4>
          </div>
        </div>
        <div className="box mx-2">
          <div>
            <p>Overdue Running</p>
            <h4>{counts.overdueRunningProjects}</h4>
          </div>
        </div>
        <div className="box mx-2">
          <div>
            <p>Cancelled</p>
            <h4>{counts.cancelledProjects}</h4>
          </div>
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
  );
};

export default Dashboard;
