import React from 'react';
import '../../styles/ProjectList.css'
const DesktopProjectRow = ({ project, updateStatus }) => (
    <tr>
        <td>
            <div>
                <strong>{project.Projecttheme}</strong>
            </div>
            <div>
                <small>{new Date(project.Startdate).toLocaleDateString()} to {new Date(project.Enddate).toLocaleDateString()}</small>
            </div>
        </td>
        <td>{project.Reason}</td>
        <td>{project.Type}</td>
        <td>{project.Division}</td>
        <td>{project.Category}</td>
        <td>{project.Priority}</td>
        <td>{project.Department}</td>
        <td>{project.Location}</td>
        <td>{project.Status}</td>
        <td>
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
        </td>
    </tr>
);

export default DesktopProjectRow;
