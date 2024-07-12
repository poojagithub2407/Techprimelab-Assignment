import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ProjectList.css'; // Import custom CSS
import ProjectTable from '../components/projectList/ProjectTable';
import SearchBar from '../components/projectList/SearchBar'; // Import the SearchBar component
import SortBySelect from '../components/projectList/SortBySelect'; // Import the SortBySelect component
import Pagination from '../components/projectList/Pagination'; // Import the Pagination component
import BASE_URL from '../api/api';
import Sidebar from '../layout/Sidebar';

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
    }, [searchTerm, sortBy, sortOrder, page]);

    const fetchProjects = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/projects/projects`, {
                params: {
                    searchTerm,
                    sortBy: sortBy.toLowerCase(), // Ensure sortBy is lowercased to match backend field names
                    sortOrder,
                    page,
                    limit: 6
                }
            });
            setProjects(response.data.projects);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };

    const clearSearch = () => {
        setSearchTerm('');
        setPage(1);
    };

    const handleSortChange = (e) => {
        const selectedSortBy = e.target.value;
        setSortBy(selectedSortBy);
        setSortOrder(prevSortOrder => (prevSortOrder === 'asc' ? 'desc' : 'asc'));
        setPage(1);
    };

    const headers = ['Project', 'Reason', 'Type', 'Division', 'Category', 'Priority', 'Department', 'Location', 'Status'];

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <Sidebar />
            <div className="container project-container">
                <div className="p-4 rounded d-flex align-items-center justify-content-between">
                    <div className="mr-md-auto  mr-sm-0">
                        <SearchBar
                            searchTerm={searchTerm}
                            handleSearchChange={handleSearchChange}
                            clearSearch={clearSearch}
                            showClearIcon={!!searchTerm}
                        />
                    </div>
                    <div className="ml-auto mr-sm-auto">
                        <SortBySelect
                            field={sortBy}
                            handleSortChange={handleSortChange}
                            headers={headers} 
                        />
                    </div>
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
        </>

    );
};

export default ProjectList;
