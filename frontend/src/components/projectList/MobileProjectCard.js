import React from 'react';
import '../../styles/ProjectList.css'

const MobileProjectCard = ({ project, updateStatus }) => (
    <div className="card p-2">
        <div>
            <strong className="font-weight-normal">{project.Projecttheme}</strong>
        </div>
        <div>
            <small>{new Date(project.Startdate).toLocaleDateString()} to {new Date(project.Enddate).toLocaleDateString()}</small>
        </div>
        <div>
            <span className='text-black-50'>Reason</span>:<strong style={{ fontSize: '1rem' }}>{project.Reason}</strong>
        </div>
        <div className="label-value-list">
            <span className='text-black-50'>Type</span>: <span>{project.Type}</span>
            <span className='bullet-point' />
            <span className="text-black-50">Category</span>: <span>{project.Category}</span>
        </div>
        <div>
            <span className='text-black-50'>Div</span>:<span>{project.Division}</span>
            <span className='bullet-point' />
            <span className='text-black-50'>Dept</span>:<span>{project.Department}</span>
        </div>
        <div>
            <span className='text-black-50'>Location</span>:<span>{project.Location}</span>
        </div>
        <div>
            <span className='text-black-50'>Priority</span>:<span> {project.Priority}</span>
        </div>
        <div>
            <span className='text-black-50'>Status</span>: <span>{project.Status}</span>
        </div>
        <div>
            {/* Example buttons (replace with your logic) */}
            <button className="btn-status" onClick={() => updateStatus(project._id, 'Running')}>
                Start
            </button>
            <button className="btn-status" onClick={() => updateStatus(project._id, 'Closed')}>
                Close
            </button>
            <button className="btn-status" onClick={() => updateStatus(project._id, 'Cancelled')}>
                Cancel
            </button>
        </div>
    </div>
);

export default MobileProjectCard;
