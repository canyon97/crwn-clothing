import { useState } from "react";

import { SignUpContainer } from "./sign-up-form.styles";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

// Default form values upon init
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
    <SignUpContainer>
      <h2>I do not have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
