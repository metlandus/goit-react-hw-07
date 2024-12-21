import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from './Redux/contactOps';
import { selectFilteredContacts } from './Redux/contactsSlice';

import ContactForm from './Components/ContactForm/ContactForm';
import ContactList from './Components/ContactList';
import Filter from './Components/SearchBox';


function App() {
    const dispatch = useDispatch();

    const contacts = useSelector(selectFilteredContacts);
    const loading = useSelector((state) => state.contacts.loading);
    const error = useSelector((state) => state.contacts.error);

    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
        <div className="App">
            <h1>Phonebook</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            <ContactForm />
            <Filter />
            <ContactList contacts={contacts} />
        </div>
    );
}

export default App;