import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation schema using Yup
const validationSchema = Yup.object({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

// Formik form component
function FormikForm() {
  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Form submitted with values:', values);
        // Handle form submission logic here
      }}
    >
      <Form className="registration-form">
        <h2>Register</h2>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <Field type="text" id="username" name="username" />
          <ErrorMessage name="username" component="div" className="error" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <Field type="email" id="email" name="email" />
          <ErrorMessage name="email" component="div" className="error" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <Field type="password" id="password" name="password" />
          <ErrorMessage name="password" component="div" className="error" />
        </div>
        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}

export default FormikForm;
