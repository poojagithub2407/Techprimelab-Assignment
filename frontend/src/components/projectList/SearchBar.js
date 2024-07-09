import React from 'react';

const SearchBar = ({ searchTerm, handleSearchChange, clearSearch, showClearIcon }) => (
    <div className="input-group input-groups">
        <input
            type="text"
            className="form-control form-border"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearchChange}
        />
        {showClearIcon && (
            <div className="input-icon icons" onClick={clearSearch}>
                <i className="fas fa-times-circle"></i>
            </div>
        )}
    </div>
);

export default SearchBar;
