import Contact from './Contact.jsx';
import { useSelector, useDispatch } from "react-redux";
import { deleteContact } from "../Redux/contactsSlice";

const ContactList = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);
    const nameFilter = useSelector(state => state.filters.nameFilter);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(nameFilter.toLowerCase())
    );

    const handleDelete = (id) => {
        dispatch(deleteContact(id));
    };

    return (
        <ul>
            {filteredContacts.map((contact) => (
                <Contact
                    key={contact.id}
                    id={contact.id}
                    name={contact.name}
                    number={contact.number}
                    onDelete={handleDelete}
                />
            ))}
        </ul>
    );
};

export default ContactList;