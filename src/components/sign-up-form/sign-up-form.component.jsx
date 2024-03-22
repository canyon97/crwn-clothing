import { useState } from "react";

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

  const handleChange = (event) => {
    // Get values from event
    const { name, value } = event.target;

    // Spread operator on all values and then set the named key (name) to it's new value
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      {
        // TODO - implement onSubmit
      }
      <form onSubmit={() => {}}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <label>Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
