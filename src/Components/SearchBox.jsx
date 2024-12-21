import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNameFilter } from '../Redux/filtersSlice';

const Filter = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.filters.name); 

    const handleFilterChange = (e) => {
        dispatch(setNameFilter(e.target.value));
    };

    return (
        <div>
            <p>Find Contacts by name</p>
            <input
                type="text"
                value={filter} 
                onChange={handleFilterChange}
            />
        </div>
    );
};

export default Filter;