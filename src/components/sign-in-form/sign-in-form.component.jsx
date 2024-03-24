import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import "./sign-in-form.styles.scss";

import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // Define state for form fields and extract fields
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithGooglePopUp();
    } catch (e) {
      // General error catcher - e.g. if user closes google sign in firebase will fire error
      console.error(e);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(
        email,
        password
      );

      resetFormFields();
    } catch (e) {
      // We want to include the break to ensure we don't try to match to other cases after reaching one successfully
      switch (e.code) {
        case "auth/invalid-credential":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("user does not exist");
          break;
        // TODO - add in handling for being locked out due to too many attempts
        default:
          // Default case - log error to console and handle later
          console.error(e);
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
    <div className="sign-in-container">
      <h2>I already have an account?</h2>
      <span>Sign in with your email and password or via Google</span>
      <form onSubmit={handleSubmit}>
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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
