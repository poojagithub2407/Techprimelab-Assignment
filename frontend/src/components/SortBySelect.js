import React from 'react';

const SortBySelect = ({ field, handleSortChange, headers }) => (
    <div className=" ms-auto d-flex align-items-center sort-by-container">
        <div className="text-gray">SortBy:</div>
        <div className="ms-2">
            <select
                className="form-select"
                value={field}
                onChange={handleSortChange}
                style={{ border: 'none' }}
            >
                {headers.map((header, index) => (
                    <option key={index} value={header.toLowerCase()}>{header}</option>
                ))}
            </select>
        </div>
    </div>
);

export default SortBySelect;
