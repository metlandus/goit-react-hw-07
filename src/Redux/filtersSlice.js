import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
    name: "filters",
    initialState: {
        nameFilter: "",
    },
    reducers: {
        changeFilter(state, action) {
            state.nameFilter = action.payload;
        },
    },
});

export const { changeFilter } = filtersSlice.actions;
export default filtersSlice.reducer;