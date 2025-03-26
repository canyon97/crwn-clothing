import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const envParams = import.meta.env;

// Define firebase config from environment variables
const firebaseConfig = {
  apiKey: envParams.VITE_FIREBASE_API_KEY,
  authDomain: envParams.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: envParams.VITE_FIREBASE_PROJECT_ID,
  storageBucket: envParams.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envParams.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: envParams.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Provider is agnostic - we can use github, facebook, google etc
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// We want a singular auth
export const auth = getAuth();
export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);

// Define auth methods
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalFields = {}
) => {
  if (!userAuth) {
    return;
  }

  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  const userExists = userSnapshot.exists();

  // If user data does not exist, create a new user data
  if (!userExists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Firebase set values
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalFields,
      });
    } catch (e) {
      console.error(`error creating user:${e.message}`);
    }
  } else {
    console.log("User already exists");
  }

  // Return the user document reference
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (email && password) {
    // Get user auth from firebase
    return createUserWithEmailAndPassword(auth, email, password);
  } else {
    return;
  }
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  const authResponse = signInWithEmailAndPassword(auth, email, password);
  return authResponse;
};
