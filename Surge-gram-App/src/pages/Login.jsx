import React, { useState } from 'react'; // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login , clearSuccess } from '../../features/auth/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    const userData = { email, password };

    // Dispatch the login action
    dispatch(login(userData));
  };

  // Handle navigation and state reset on successful login
  React.useEffect(() => {
    if (isSuccess) {
      navigate('/');
      dispatch(clearSuccess());
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <div style={styles.container}>
      <h1>Login to Surge-Gram</h1>
      <form onSubmit={handleLogin} style={styles.form}>
        {isError && <p style={styles.error}>{message}</p>}
        <div style={styles.inputGroup}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
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
    marginBottom: '15px',
  },
};

export default Login;
