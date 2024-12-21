import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    nameFilter: '',
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setNameFilter(state, action) {
            state.nameFilter = action.payload;
        },
    },
});

export const { setNameFilter } = filtersSlice.actions;

export const selectNameFilter = (state) => state.filters.nameFilter;

export const filterReducer = filtersSlice.reducer;

export default filtersSlice.reducer;