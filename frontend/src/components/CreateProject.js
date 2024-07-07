import React from 'react';
import '../styles/CreateProject.css'; 

const CreateProject = () => {
  return (
    <div className='container create-container'>
      <div className='row mt-sm-0'>
        <div className='col-md-8 col-sm-2 mt-5'>
          <textarea
            className='form-control'
            placeholder='Enter Project Theme'
          ></textarea>
        </div>
        <div className='col-md-4 col-sm-2 d-flex align-items-end justify-content-end mb-4'>
          <button className='save-button'>Save Project</button>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>Reason</label>
          <select className='form-select p-md-3 p-sm-0'>
            <option>For Business</option>
          </select>
        </div>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>Type</label>
          <select className='form-select p-md-3 p-sm-0'>
            <option>Internal</option>
          </select>
        </div>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>Division</label>
          <select className='form-select p-md-3 p-sm-0'>
            <option>For Filters</option>
          </select>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>Category</label>
          <select className='form-select p-md-3 p-sm-0'>
            <option>For Business</option>
          </select>
        </div>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>Priority</label>
          <select className='form-select p-md-3 p-sm-0'>
            <option>Internal</option>
          </select>
        </div>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>Department</label>
          <select className='form-select p-md-3 p-sm-0'>
            <option>For Filters</option>
          </select>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>Start Date as per Project Plan</label>
          <input type='date' className='form-control p-md-3 p-sm-0' />
        </div>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>End Date as Per Project Plan</label>
          <input type='date' className='form-control p-md-3 p-sm-0' />
        </div>
        <div className='col-md-3 mx-sm-4 mx-md-3'>
          <label className='form-label'>Location</label>
          <select className='form-select p-md-3 p-sm-0'>
            <option>Pune</option>
          </select>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-4 end-aligned'>
          <span>Status</span>:<strong>Register</strong>
        </div>

      </div>
    </div>
  );
};

export default CreateProject;
