import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MobileProjectCard from './MobileProjectCard';
import DesktopProjectRow from './DesktopProjectRow';
import '../styles/CardView.css';
import BASE_URL from '../api/api';

const ProjectTable = ({ projects, headers }) => {
    const [isMobileView, setIsMobileView] = useState(false);
    const [localProjects, setLocalProjects] = useState(projects);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const updatedProjects = localProjects.map(project => {
                if (project._id === id) {
                    return { ...project, Status: status };
                }
                return project;
            });
            setLocalProjects(updatedProjects);

            await axios.put(`${BASE_URL}/projects/${id}/status`, { status });
        } catch (error) {
            console.error('Error updating status:', error);
            const revertedProjects = localProjects.map(project => {
                if (project._id === id) {
                    return { ...project, Status: project.Status };
                }
                return project;
            });
            setLocalProjects(revertedProjects);
        }
    };

    const renderMobileView = () => (
        <div className="card-container">
            {localProjects && localProjects.map((project) => (
                <MobileProjectCard key={project._id} project={project} updateStatus={updateStatus} />
            ))}
        </div>
    );

    const renderDesktopView = () => (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        {headers && headers.map((header, index) => (
                            <th
                                style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }} key={index}>{header}</th>
                        ))}
                        <th style={{ backgroundColor: 'rgba(173, 216, 230, 0.5)' }}
                        ></th>
                    </tr>
                </thead>
                <tbody>
                    {localProjects && localProjects.map((project) => (
                        <DesktopProjectRow key={project._id} project={project} updateStatus={updateStatus} />
                    ))}
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="project-table-container">
            {isMobileView ? renderMobileView() : renderDesktopView()}
        </div>
    );
};

export default ProjectTable;
