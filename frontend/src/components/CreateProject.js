import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom'; 
import '../styles/CreateProject.css';
import BASE_URL from '../api/api';
import Sidebar from './../layout/Sidebar';

const CreateProject = () => {
  const initialFormData = {
    Projecttheme: '',
    Reason: 'Business',
    Type: 'Internal',
    Division: 'Sale',
    Category: 'Quality A',
    Priority: 'High',
    Department: 'Strategy',
    Startdate: '',
    Enddate: '',
    Location: 'Pune'
  };

  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState('');
  const [errorClass, setErrorClass] = useState('');
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (message !== '') {
      setMessage('');
      setErrorClass('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.Enddate) < new Date(formData.Startdate)) {
      setMessage('End Date is  ');
      setErrorClass('error-border');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/projects/create`, formData);

      if (response.status === 201) {
        setMessage('Project created successfully!');
        setFormData(initialFormData);
        setErrorClass('');
        navigate('/project-list');
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setMessage('Failed to create project. Please try again.');
    }
  };

  return (
    <>
      <Sidebar />
      <div className='container create-container'>
        <form onSubmit={handleSubmit}>
          <div className='row mt-sm-0'>
            <div className='col-md-8 col-sm-2 mt-md-5 mt-sm-1'>
              <textarea
                className='form-control'
                placeholder='Enter Project Theme'
                name='Projecttheme'
                value={formData.Projecttheme}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <div className='col-md-4 col-sm-2 d-flex align-items-end justify-content-end mb-4'>
              <button type='submit' className='save-button'>
                Save Project
              </button>
            </div>
          </div>
          <div className='row mt-md-4 mt-sm-0'>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Reason</label>
              <select
                className='form-select p-md-3 p-sm-0'
                name='Reason'
                value={formData.Reason}
                onChange={handleInputChange}
              >
                <option>Business</option>
                <option>DealerShip</option>
                <option>Transport</option>
              </select>
            </div>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Type</label>
              <select
                className='form-select p-md-3 p-sm-0'
                name='Type'
                value={formData.Type}
                onChange={handleInputChange}
              >
                <option>Internal</option>
                <option>External</option>
                <option>Vendor</option>
              </select>
            </div>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Division</label>
              <select
                className='form-select p-md-3 p-sm-0'
                name='Division'
                value={formData.Division}
                onChange={handleInputChange}
              >
                <option>Sale</option>
                <option>Filters</option>
                <option>Glass</option>
                <option>Compress</option>
                <option>Water Heater</option>
              </select>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Category</label>
              <select
                className='form-select p-md-3 p-sm-0'
                name='Category'
                value={formData.Category}
                onChange={handleInputChange}
              >
                <option>Quality A</option>
                <option>Quality B</option>
                <option>Quality C</option>
                <option>Quality D</option>
              </select>
            </div>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Priority</label>
              <select
                className='form-select p-md-3 p-sm-0'
                name='Priority'
                value={formData.Priority}
                onChange={handleInputChange}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Department</label>
              <select
                className='form-select p-md-3 p-sm-0'
                name='Department'
                value={formData.Department}
                onChange={handleInputChange}
              >
                <option>Strategy</option>
                <option>Finance</option>
                <option>Quality</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Start Date as per Project Plan</label>
              <input
                type='date'
                className='form-control p-md-3 p-sm-0'
                name='Startdate'
                value={formData.Startdate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className={`col-md-3 mx-sm-4 mx-md-3 ${errorClass}`}>
              <label className={`form-label ${message.includes('earlier') ? 'error' : ''}`}>
                End Date as Per Project Plan
              </label>
              <input
                type='date'
                className={`form-control p-md-3 p-sm-0 ${errorClass}`}
                name='Enddate'
                value={formData.Enddate}
                onChange={handleInputChange}
                required
              />
              {message && message.includes('earlier') && (
                <div className='error'>
                  {message}
                </div>
              )}
            </div>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Location</label>
              <select
                className='form-select p-md-3 p-sm-0'
                name='Location'
                value={formData.Location}
                onChange={handleInputChange}
              >
                <option>Pune</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Hyderabad</option>
              </select>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-md-4 end-aligned'>
              <span className='text-gray'>Status</span>: <strong>Registered</strong>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateProject;
