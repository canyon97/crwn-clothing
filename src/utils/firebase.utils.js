import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
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

const provider = new GoogleAuthProvider({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  const userExists = userSnapshot.exists();

  // If user data does not exist, create a new user data
  if (!userExists) {
    const userPayload = {
      displayName: userAuth.displayName,
      email: userAuth.email,
      createdAt: new Date(),
    };

    try {
      await setDoc(userDocRef, userPayload);
    } catch (e) {
      console.error(e);
    }
  } else {
    console.log("User already exists");
  }

  // Return the user document reference
  return userDocRef;
};
