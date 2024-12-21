import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = 'https://6766befe410f849996587993.mockapi.io/contacts'; 

export const fetchContacts = createAsyncThunk(
    "contacts/fetchContacts",
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (newContact, thunkAPI) => {
        try {
            const response = await axios.post(API_URL, newContact);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (contactId, thunkAPI) => {
        try {
            const response = await axios.delete(`${API_URL}/${contactId}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);