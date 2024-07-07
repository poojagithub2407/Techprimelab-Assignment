import React from 'react'
import '../styles/ProjectList.css'
const ProjectList = () => {
     return (
          <div className='project-list-container'>
              <div className='table-function d-flex justify-content-between align-items-center'>
                  <div className="mx-3">
                      <input type="text" className="form-control" placeholder="Search..." />
                  </div>
                  <div className="d-flex align-items-end mx-3">
                      <span>Sort By:</span>
                      <select className="form-control">
                          <option>Option 1</option>
                          <option>Option 2</option>
                          <option>Option 3</option>
                      </select>
                  </div>
              </div>
          </div>
      );
}

export default ProjectList