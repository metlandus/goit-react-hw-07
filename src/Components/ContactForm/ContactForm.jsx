import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../Redux/contactsSlice';
import styles from './ContactForm.module.css';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "Too Short!")
        .max(500, "Too Long!")
        .required("Required"),
    number: Yup.string()
        .matches(/^\d{3}-\d{2}-\d{2}$/, "Invalid phone number")
        .required("Required"),
});

const initialValues = {
    name: "",
    number: "",
};

const ContactForm = () => {
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts.items);

    const handleSubmit = (values, actions) => {
        const existingContact = contacts.find(contact => contact.name === values.name && contact.number === values.number);
        if (existingContact) {
            alert("This contact already exists!");
            return;
        }

        const newContact = {
            id: nanoid(),
            name: values.name,
            number: values.number,
        };
        dispatch(addContact(newContact));
        actions.resetForm();
    };

    const handleNumberChange = (event, setFieldValue) => {
        const { value } = event.target;
        const formattedValue = value
            .replace(/\D/g, "")
            .replace(/(\d{3})(\d{2})?(\d{2})?/, (_, g1, g2, g3) => {
                return [g1, g2, g3].filter(Boolean).join("-");
            });
        setFieldValue("number", formattedValue);
    };

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            {({ setFieldValue }) => (
                <Form className={styles.form}>
                    <div>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <Field type="text" name="name" id="name" className={styles.input} />
                        <ErrorMessage name="name" component="span" className={styles.error} />
                    </div>

                    <div>
                        <label htmlFor="number" className={styles.label}>Number</label>
                        <Field
                            type="text"
                            name="number"
                            id="number"
                            className={styles.input}
                            onChange={(event) => handleNumberChange(event, setFieldValue)}
                        />
                        <ErrorMessage name="number" component="span" className={styles.error} />
                    </div>

                    <button type="submit" className={styles.button}>Add Contact</button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;