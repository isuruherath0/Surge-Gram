import React from 'react'; // eslint-disable-line no-unused-vars
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

import { auth } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const initialValues = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    captchaToken: '',
  };

  const validationSchema = Yup.object({
    fullname: Yup.string()
      .required('Full name is required')
      .min(3, 'Full name must be at least 3 characters long'),
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long'),
    captchaToken: Yup.string().required('Please verify you are not a robot'),
  });

  const handleSignup = (values, { setSubmitting }) => {

    createUserWithEmailAndPassword(auth, values.email, values.password)
    dispatch(register(values));
    setSubmitting(false);
  };

  React.useEffect(() => {
    if (isSuccess) {
      navigate('/login');
    }
  }, [isSuccess, navigate]);

  return (
    <div style={styles.container}>
      <h1>Signup for Surge-Gram</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignup}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form style={styles.form}>
            {isError && <p style={styles.error}>{message}</p>}
            {isSuccess && <p style={styles.success}>Signup successful! Redirecting to login...</p>}

            <div style={styles.inputGroup}>
              <label>Full Name:</label>
              <Field
                type="text"
                name="fullname"
                style={styles.input}
              />
              <ErrorMessage name="fullname" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label>Username:</label>
              <Field
                type="text"
                name="username"
                style={styles.input}
              />
              <ErrorMessage name="username" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label>Email:</label>
              <Field
                type="email"
                name="email"
                style={styles.input}
              />
              <ErrorMessage name="email" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <label>Password:</label>
              <Field
                type="password"
                name="password"
                style={styles.input}
              />
              <ErrorMessage name="password" component="div" style={styles.error} />
            </div>

            <div style={styles.inputGroup}>
              <ReCAPTCHA
                sitekey="6LcnQq4qAAAAACuZXFpPney0d1XYzONuz7jQxFVF" 
                onChange={(token) => setFieldValue('captchaToken', token)}
              />
              <ErrorMessage name="captchaToken" component="div" style={styles.error} />
            </div>

            <button
              type="submit"
              style={styles.button}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing up...' : 'Signup'}
            </button>
          </Form>
        )}
      </Formik>
      <p style={styles.linkText}>
        Already have an account? <Link to="/login" style={styles.link}>Login here</Link>
      </p>
    </div>
  );
};

const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      textAlign: 'center',
      border: '1px solid #ddd',
      borderRadius: '8px',
      boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
    },
    inputGroup: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    input: {
      width: '100%',
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      marginTop: '5px',
    },
    button: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
    },
    error: {
      color: 'red',
      marginTop: '5px',
    },
    success: {
      color: 'green',
      marginBottom: '15px',
    },
    linkText: {
      marginTop: '15px',
      fontSize: '14px',
    },
    link: {
      color: '#007bff',
      textDecoration: 'none',
    },
  };

export default SignupForm;
