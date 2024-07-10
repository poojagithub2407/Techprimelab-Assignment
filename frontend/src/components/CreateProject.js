import React, { useState } from 'react';
import axios from 'axios';
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
  const [startDateError, setStartDateError] = useState('');
  const [endDateError, setEndDateError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStartDateChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, Startdate: value });
    setStartDateError('');
    if (formData.Enddate && value > formData.Enddate) {
      setEndDateError('End date cannot be smaller than start date');
    } else {
      setEndDateError('');
    }
  };

  const handleEndDateChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, Enddate: value });
    setEndDateError('');
    if (formData.Startdate && value < formData.Startdate) {
      setEndDateError('End date cannot be greater than start date');
    } else {
      setEndDateError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE_URL}/projects/create`, formData);

      if (response.status === 201) {
        setMessage('Project created successfully!');
        setFormData(initialFormData);
      }
    } catch (error) {
      console.error('Error creating project:', error);
      setMessage('Failed to create project. Please try again.');
    }
  };

  return (
    <>
      <Sidebar/>
      <div className='container create-container'>
        <form onSubmit={handleSubmit}>
          <div className='row mt-sm-0'>
            <div className='col-md-8 col-sm-2 mt-5'>
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
          <div className='row mt-4'>
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
                onChange={handleStartDateChange}
                required
              />
              {startDateError && (
                <small className='text-danger'>{startDateError}</small>
              )}
            </div>
            <div className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>End Date as Per Project Plan</label>
              <input
                type='date'
                className='form-control p-md-3 p-sm-0'
                name='Enddate'
                value={formData.Enddate}
                onChange={handleEndDateChange}
                required
              />
              {endDateError && (
                <small className='text-danger'>{endDateError}</small>
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
              <span>Status</span>: <strong>Registered</strong>
            </div>
          </div>
          <div className='row mt-4'>
            <div className='col-md-12'>
              {message && (
                <div className={message.includes('successfully') ? 'text-success' : 'text-danger'}>
                  {message}
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </>

  );
};

export default CreateProject;
