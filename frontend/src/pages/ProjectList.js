import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProjectList.css'; // Import custom CSS
import ProjectTable from '../components/projectList/ProjectTable';
import SearchBar from '../components/projectList/SearchBar'; // Import the SearchBar component
import SortBySelect from '../components/projectList/SortBySelect'; // Import the SortBySelect component
import Pagination from '../components/projectList/Pagination'; // Import the Pagination component

const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetchProjects();
    }, [searchTerm, sortBy, sortOrder, page]); // Fetch projects whenever searchTerm, sortBy, sortOrder, or page changes

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/projects/projects', {
                params: { 
                    Projecttheme: searchTerm,
                    sortBy,
                    sortOrder,
                    page,
                    limit: 5 // Define the limit per page
                }
            });
            setProjects(response.data.projects); // Assuming response.data contains the projects array
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1); // Reset to first page on search
    };

    const clearSearch = () => {
        setSearchTerm('');
        setPage(1); // Reset to first page on search clear
    };

    const handleSortChange = (e) => {
        const selectedSortBy = e.target.value;
        setSortBy(selectedSortBy);
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
        setPage(1); // Reset to first page on sort change
    };

    const headers = ['Project Theme', 'Reason', 'Type', 'Division', 'Category', 'Priority', 'Department', 'Location', 'Status'];

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <div className="container project-container">
            <div className="p-4 bg-white shadow-sm rounded">
                <SearchBar
                    searchTerm={searchTerm}
                    handleSearchChange={handleSearchChange}
                    clearSearch={clearSearch}
                    showClearIcon={!!searchTerm}
                />
                <SortBySelect 
                    field={sortBy} 
                    handleSortChange={handleSortChange} 
                    headers={headers.map(header => header.replace(' ', '').toLowerCase())} // Converting headers to match field names
                />
            </div>
            <div className="mt-4">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div>
                        <ProjectTable projects={projects} headers={headers} />
                        <Pagination 
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectList;
