import React from 'react';
import '../styles/Dashboard.css';
import BarChart from './BarChart';

const Dashboard = () => {
  return (
    <div className="container my-3">
      <div className="d-flex justify-content-between">
        <div className="box mx-2">
          <div>
            <p>Closed</p>
            <h4>2</h4>
          </div>
        </div>
        <div className="box mx-2">
          <div>
            <p>Running</p>
            <h4>2</h4>
          </div>
        </div>
        <div className="box mx-2">
          <div>
            <p>Closure Delay</p>
            <h4>2</h4>
          </div>
        </div>
        <div className="box mx-2">
          <div>
            <p>Cancelled</p>
            <h4>2</h4>
          </div>
        </div>
        <div className="box mx-2">
          <div>
            <p>Closed</p>
            <h4>2</h4>
          </div>
        </div>
      </div>
      <div>
        <p className='closed'>
          Department wise -Total Vs Closed
        </p>
      </div>
      <div>
      <BarChart/>
      </div>
    </div>
  );
};

export default Dashboard;
