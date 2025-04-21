import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { signIn } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";

import InputField from "../microComponents/InputField/InputField";
import ButtonPrimary from "../microComponents/ButtonPrimary/ButtonPrimary";
import Alert from "../microComponents/Alert/Alert";
import { Heading2, Link } from "../microComponents/Typography"; 

import styles from "./SignInForm.module.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const handleChange = (event) => {
    setMessage("");
    const { name, value } = event.target ? event.target : event;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message || "An error occurred. Please try again."); 
    }
  };

  const isFormInvalid = () => {
    return !(username && password);
  };

  return (
    <main className={styles.pageContainer}> 
      <form className={styles.formContainer} autoComplete="off" onSubmit={handleSubmit}>
        <Heading2 className={styles.formHeader}>Sign In</Heading2>

        {/* Display Alert message if it exists */}
        {message && (
          <Alert type="error" className={styles.errorMessage}>
            {message}
          </Alert>
        )}

        <InputField
          label="Username"
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username" 
        />

        <InputField
          label="Password"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="current-password" 
        />

        <div className={styles.buttonGroup}>
          <ButtonPrimary type="submit" disabled={isFormInvalid()}>
            Sign In
          </ButtonPrimary>
        </div>

        <div className={styles.signUpLink}>
          <Link onClick={() => navigate("/sign-up")}>New? Create an account.</Link>
        </div>
      </form>
    </main>
  );
};

export default SignInForm;
