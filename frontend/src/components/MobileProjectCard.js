import React from 'react';
import '../styles/ProjectList.css';

const MobileProjectCard = ({ project, updateStatus }) => (
    <div className="card p-2 mb-2 border-0">
        <div className='d-flex align-items-center justify-content-between'>
            <div className="flex-grow-1">
                <strong className="font-weight-normal">{project.Projecttheme}</strong>
                <div>
                    <small>
                        {new Date(project.Startdate)
                            .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}

                        &nbsp;to &nbsp;

                        {new Date(project.Enddate)
                            .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </small>
                </div>
            </div>
            <strong
                className="font-weight-normal mb-4">
                {project.Status}
            </strong>
        </div>
        <div className='mt-2'>

            <div>
                <span
                    className='text-black-50'>Reason</span>
                :<strong
                    style={{ fontSize: '1rem' }}>{project.Reason}</strong>
            </div>
            <div className="label-value-list">
                <span
                    className='text-black-50'>Type</span>
                : <span>{project.Type}</span>
                <span className='bullet-point' />
                <span
                    className="text-black-50">Category</span>
                : <span>{project.Category}</span>
            </div>
            <div>
                <span className='text-black-50'>Div</span>
                :<span>{project.Division}</span>
                <span className='bullet-point' />
                <span className='text-black-50'>Dept</span>
                :<span>{project.Department}</span>
            </div>
            <div>
                <span className='text-black-50'>Location</span>
                :<span>{project.Location}</span>
            </div>
            <div>
                <span className='text-black-50'>Priority</span>
                :<span> {project.Priority}</span>
            </div>
            <div className='d-flex align-items-center
             justify-content-between gap-2 mt-3'>
                <button className="btn-status btn-default"
                    onClick={() => updateStatus(project._id, 'Running')}>
                    Start
                </button>
                <button
                    className="btn-status"
                    onClick={() => updateStatus(project._id, 'Closed')}>
                    Close
                </button>
                <button
                    className="btn-status"
                    onClick={() => updateStatus(project._id, 'Cancelled')}>
                    Cancel
                </button>
            </div>
        </div>
    </div>
);

export default MobileProjectCard;
