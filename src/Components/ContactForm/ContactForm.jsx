import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../Redux/contactOps';
import styles from './ContactForm.module.css';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, "Too Short!")
        .max(500, "Too Long!")
        .required("Required"),
    number: Yup.string()
        .matches(/^\d{3}-\d{2}-\d{2}$/, "Invalid phone number")
        .required("Required"),
});

const handleNumberChange = (event, setFieldValue) => {
    const { value } = event.target;
    const formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d{2})?(\d{2})?/, (_, g1, g2, g3) => {
            return [g1, g2, g3].filter(Boolean).join("-");
        });
    setFieldValue("number", formattedValue);
};

const ContactForm = ({ contactToEdit }) => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    useEffect(() => {
        if (contactToEdit) {
            setName(contactToEdit.name);
            setPhone(contactToEdit.phone);
        }
    }, [contactToEdit]);

    const handleSubmit = (values, { resetForm }) => {
        if (contactToEdit) {
            // Update contact logic here
        } else {
            dispatch(addContact({ name: values.name, phone: values.number }));
        }
        resetForm();
    };

    const initialValues = {
        name: contactToEdit ? contactToEdit.name : '',
        number: contactToEdit ? contactToEdit.phone : '',
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

                    <button type="submit" className={styles.button}>{contactToEdit ? 'Update Contact' : 'Add Contact'}</button>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;