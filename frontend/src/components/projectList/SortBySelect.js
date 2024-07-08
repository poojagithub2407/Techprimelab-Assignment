import React from 'react';

const SortBySelect = ({ field, handleSortChange, headers }) => (
    <div className="ms-auto d-flex align-items-center sort-by-container">
        <div className="text-gray">Sort By:</div>
        <div>
            <select
                className="form-select"
                value={field}
                onChange={handleSortChange}
                style={{ border: 'none' }} // Remove border of select
            >
                <option value="">Select Field</option>
                {headers.map((header, index) => (
                    <option key={index} value={header}>{header}</option>
                ))}
            </select>
        </div>
    </div>
);

export default SortBySelect;
