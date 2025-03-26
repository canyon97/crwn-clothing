import './SignUpForm.scss';

import { useState } from "react";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase.utils";
import FormInput from "../FormInput/FormInput";
import Button from '../Button/Button';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  // Define current state and setter state
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (event) => {
    console.log("submitting");
    event.preventDefault();

    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };

    // Check if passwords match
    if (password.length < 6) {
      alert("Password must be at least 6 characters");
    }
    if (password !== confirmPassword) {
      alert("Passwords must match");
      return;
    }

    try {
      // Create user auth from email and password and get userdoc ref
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      // Create entry in firestore for user using displayname and date from form
      await createUserDocumentFromAuth(user, {
        displayName,
      });

      resetFormFields();
    } catch (e) {
      if (e.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      }
    }
  };

  const handleChange = (event) => {
    // Get values from event
    const { name, value } = event.target;

    // Spread operator on all values and then set the named key (name) to it's new value
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className = 'sign-up-container'>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          name="displayName"
          onChange={handleChange}
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          name="email"
          onChange={handleChange}
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          name="password"
          value={password}
          onChange={handleChange}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
