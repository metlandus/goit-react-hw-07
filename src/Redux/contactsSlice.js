import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { selectNameFilter } from './filtersSlice';
import { fetchContacts, addContact, deleteContact } from './contactOps'; 

const initialState = {
    contacts: [],
    loading: false,
    error: null,
};

const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    reducers: {
        addContactDirect(state, action) {
            state.contacts.push(action.payload);
        },
        deleteContactDirect(state, action) {
            state.contacts = state.contacts.filter(contact => contact.id !== action.payload);
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.contacts.push(action.payload);
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.contacts = state.contacts.filter(contact => contact.id !== action.payload.id);
            });
    },
});

export const { addContactDirect, deleteContactDirect, setLoading, setError } = contactsSlice.actions;

export const contactsReducer = contactsSlice.reducer;

export const selectContacts = (state) => state.contacts.contacts;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
    [selectContacts, selectNameFilter],
    (contacts, nameFilter) => {
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }
);