import React, { useState, useEffect } from "react"; // eslint-disable-line no-unused-vars
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { login, clearSuccess} from "../../features/auth/authSlice";

import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { styles } from "../styles/loginform";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(""); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isError, isSuccess, message } = useSelector((state) => state.auth);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Please complete the CAPTCHA.");
      return;
    }

    const userData = { email, password, captchaToken }; 
    try {
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(login(userData));
    }
    catch (error) {
       alert("Error signing in " + error.message);
       console.error(error);
       return;

    }
    
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); 
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
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
        <div style={styles.captcha}>
          <ReCAPTCHA
            sitekey="6LcnQq4qAAAAACuZXFpPney0d1XYzONuz7jQxFVF"
            onChange={handleCaptchaChange}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
      <p style={styles.linkText}>
        Don&apos;t have an account?{" "}
        <Link to="/signup" style={styles.link}>
          Sign up here
        </Link>
      </p>
    </div>
  );
};



export default LoginForm;
