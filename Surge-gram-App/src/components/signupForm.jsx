import React from 'react'; 
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../features/auth/authSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReCAPTCHA from 'react-google-recaptcha';

import { auth , storage } from "../Firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import {ref , uploadBytes , getDownloadURL} from "firebase/storage";

import { styles } from '../styles/signupform';

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
    profilePicture: null,
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

  const handleSignup = async (values, { setSubmitting }) => {

    try {
        let imageUrl = "";
    
        if (values.profilePicture) {
          const storageRef = ref(storage, `profile_pictures/${values.profilePicture.name}`);
          const snapshot = await uploadBytes(storageRef, values.profilePicture);
          imageUrl = await getDownloadURL(snapshot.ref);
        }

        const formData = {
          ...values,
          imageurl: imageUrl,
        };
    
        // Firebase authentication and backend registration
        await createUserWithEmailAndPassword(auth, values.email, values.password);
        dispatch(register(formData));
      } catch (error) {
        console.error("Error during signup:", error);
      } finally {
        setSubmitting(false);
        navigate('/login');
      }
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
                <label>Profile Picture (optional):</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                        if (file.size > 4 * 1024 * 1024) {
                        alert("File size must be less than 4 MB");
                        e.target.value = null; 
                        } else {
                        setFieldValue("profilePicture", file);
                        }
                    }
                    }}
                    style={styles.input}
                />
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


export default SignupForm;
