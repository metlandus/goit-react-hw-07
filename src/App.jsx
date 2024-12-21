import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactForm from './Components/ContactForm/ContactForm';
import SearchBox from './Components/SearchBox';
import ContactList from './Components/ContactList';
import { addContact } from './Redux/contactsSlice';
import { changeFilter } from './Redux/filtersSlice';
import './App.css';

const App = () => {
    const dispatch = useDispatch();
    const contacts = useSelector((state) => state.contacts.items);
    const searchValue = useSelector((state) => state.filters.nameFilter);

    const handleAddContact = (newContact) => {
        dispatch(addContact(newContact));
    };

    const handleSearchChange = (e) => {
        dispatch(changeFilter(e.target.value));
    };

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <div className="container">
            <h1 className="title">Phonebook</h1>
            <ContactForm onAddContact={handleAddContact} />
            <SearchBox inputValue={searchValue} handleChange={handleSearchChange} className="searchBox" />
            <ContactList contacts={filteredContacts} />
        </div>
    );
};

export default App;