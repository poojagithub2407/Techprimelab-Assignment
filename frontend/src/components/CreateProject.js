import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  const [themeError, setThemeError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (message !== '') {
      setMessage('');
      setErrorClass('');
    }

    if (themeError !== '') {
      setThemeError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.Projecttheme.trim()) {
      setThemeError('Project theme is required');
      return;
    }

    if (new Date(formData.Enddate) < new Date(formData.Startdate)) {
      setMessage('End date cannot be greater than start date');
      setErrorClass('error-border');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/projects/create`, formData);

      if (response.status === 201) {
        setFormData(initialFormData);
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
      <main className='create-container'>
        <form onSubmit={handleSubmit}>
          <section className='row mt-sm-0'>
            <div className='col-md-6 col-sm-12 mt-md-4 mt-sm-2 mx-sm-4 mx-md-3'>
              <textarea
                className={`form-control ${themeError ? 'error-border' : ''}`}
                placeholder='Enter Project Theme'
                name='Projecttheme'
                value={formData.Projecttheme}
                onChange={handleInputChange}
              ></textarea>
              {themeError && <div className='error'>{themeError}</div>}
            </div>
            <div className='col-md-4 col-sm-12'>
              <button type='submit' className='save-button'>
                Save Project
              </button>
            </div>
          </section>

          <section className='row mt-md-5'>
            <article className='col-md-3 mx-sm-4 mx-md-3'>
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
            </article>
            <article className='col-md-3 mx-sm-4 mx-md-3'>
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
            </article>
            <article className='col-md-3 mx-sm-4 mx-md-3'>
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
            </article>
          </section>

          <section className='row mt-md-4 mt-sm-0'>
            <article className='col-md-3 mx-sm-4 mx-md-3'>
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
            </article>
            <article className='col-md-3 mx-sm-4 mx-md-3'>
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
            </article>
            <article className='col-md-3 mx-sm-4 mx-md-3'>
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
            </article>
          </section>

          <section className='row mt-md-4 mt-sm-0'>
            <article className='col-md-3 mx-sm-4 mx-md-3'>
              <label className='form-label'>Start Date as per Project Plan</label>
              <input
                type='date'
                className='form-control p-md-3 p-sm-0'
                name='Startdate'
                value={formData.Startdate}
                onChange={handleInputChange}
              />
            </article>
            <article className={`col-md-3 mx-sm-4 mx-md-3 ${errorClass}`}>
              <label className='form-label'>End Date as Per Project Plan</label>
              <input
                type='date'
                className={`form-control p-md-3 p-sm-0 ${errorClass}`}
                name='Enddate'
                value={formData.Enddate}
                onChange={handleInputChange}
              />
              {message && (
                <div className='error'>
                  {message}
                </div>
              )}
            </article>
            <article className='col-md-3 mx-sm-4 mx-md-3'>
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
            </article>
          </section>

          <section className='row mt-4 mt-sm-0'>
            <div className='col-md-4 col-sm-0 end-aligned'>
              <span className='text-gray'>Status</span>: <strong>Registered</strong>
            </div>
          </section>
        </form>
      </main>
    </>
  );
};

export default CreateProject;
