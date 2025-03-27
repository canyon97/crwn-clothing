import "./SignInForm.scss";

import { useState } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase.utils";

import FormInput from "../FormInput/FormInput";
import Button from "../Button/Button";

const signInWithGoogle = async () => {
  try {
    await signInWithGooglePopup();
  } catch (error) {
    console.error(error);
  }
};

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  // Define current state and setter state
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const resetFormFields = () => {
      setFormFields(defaultFormFields);
    };

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (e) {
      if (e.code === "auth/invalid-credential") {
        alert("Incorrect password");
      }
      console.log(e);
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
          {/* We put the type to button to ensure form doesn't submit */}
          <Button
            type="button"
            buttonType={"google"}
            onClick={signInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
