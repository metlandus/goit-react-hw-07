import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../Redux/contactOps';
import { selectContacts } from '../Redux/contactsSlice';
import { selectNameFilter } from '../Redux/filtersSlice';



const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    const nameFilter = useSelector(selectNameFilter);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );

    const handleDelete = (id) => {
        dispatch(deleteContact(id));
    };

    return (
        <div>
            <h2>Contact List</h2>
            {filteredContacts.length === 0 ? (
                <p>No contacts available</p>
            ) : (
                <ul>
                    {filteredContacts.map((contact) => (
                        <li key={contact.id}>
                            <p><strong>{contact.name}</strong></p>
                            <p>Phone: {contact.number}</p>
                            <button onClick={() => handleDelete(contact.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ContactList;