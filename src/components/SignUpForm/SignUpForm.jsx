import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { UserContext } from '../../contexts/UserContext';

// Import Micro Components
import InputField from "../microComponents/InputField/InputField";
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
import Alert from "../microComponents/Alert/Alert";
import { Heading2, Link } from "../microComponents/Typography";

// Import CSS Module
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (event) => {
    setMessage('');
    // Assuming InputField passes the name and value directly in the event or second argument
    const { name, value } = event.target ? event.target : event;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/'); // Redirect to home page after successful sign-up
    } catch (err) {
      setMessage(err.message || "An error occurred. Please try again.");
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className={styles.pageContainer}> {/* Page centering container */}
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <Heading2 className={styles.formHeader}>Create an Account</Heading2>

        {/* Display Alert message if it exists */}
        {message && (
          <Alert type="error" className={styles.errorMessage}>
            {message}
          </Alert>
        )}

        <InputField
          label="Username"
          type="text"
          id="username" // Changed from 'name' for consistency
          value={username}
          name='username'
          onChange={handleChange}
          required
          autoComplete="username"
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          value={password}
          name='password'
          onChange={handleChange}
          required
          autoComplete="new-password" // Use new-password for sign up
        />

        <InputField
          label="Confirm Password"
          type="password"
          id="confirm" // Keep id 'confirm'
          value={passwordConf}
          name='passwordConf'
          onChange={handleChange}
          required
          autoComplete="new-password" // Use new-password for sign up
        />

        <div className={styles.buttonGroup}>
          {/* Removed Cancel button */}
          <ButtonPrimary type="submit" disabled={isFormInvalid()}>Sign Up</ButtonPrimary>
        </div>

        {/* Add Sign In Link */}
        <div className={styles.signInLink}>
          <Link onClick={() => navigate("/sign-in")}>Already have an account? Sign In</Link>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;