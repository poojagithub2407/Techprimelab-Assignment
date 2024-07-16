import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination justify-content-center">
                {currentPage > 1 && (
                    <li className="page-item">
                        <button className="page-link circle-button" onClick={() => onPageChange(currentPage - 1)}>
                            &lt;
                        </button>
                    </li>
                )}
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === currentPage ? 'active' : ''}`}>
                        <button onClick={() => onPageChange(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                {currentPage < totalPages && (
                    <li className="page-item">
                        <button className="page-link circle-button" onClick={() => onPageChange(currentPage + 1)}>
                            &gt;
                        </button>
                    </li>
                )}
            </ul>
        </nav>
    );
};

export default Pagination;
