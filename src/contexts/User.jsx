import { useState, createContext, useEffect } from "react";

import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "../utils/firebase.utils";

// Actual value needing to be accessed
export const UserContext = createContext({
  currentUser: null, // Default value
  setCurrentUser: () => null, // Default setter function
});

// Provider to wrap around the components needing access to the value
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user) => {
      // If we get a user, we want to create a document for them in the database
      if (user) {
        await createUserDocumentFromAuth(user);
      }

      setCurrentUser(user); // Set the current user when the auth state changes
    });
    return unsubscribe; // Cleanup function to unsubscribe from the listener when the component unmounts
  }, []);

  // Provider allows us to access the value and setter for the useState
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
