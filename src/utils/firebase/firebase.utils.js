import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwoaBw6fgyX0FM5QAlGC4Wy0y71B8sNx8",
  authDomain: "crwn-clothing-db-cc8e0.firebaseapp.com",
  projectId: "crwn-clothing-db-cc8e0",
  storageBucket: "crwn-clothing-db-cc8e0.appspot.com",
  messagingSenderId: "265341080202",
  appId: "1:265341080202:web:0d78f4d81b15de2c77d373",
};

const firebaseApp = initializeApp(firebaseConfig);

// Provider is agnostic - we can use github, facebook, google etc
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Auth is singleton
export const auth = getAuth();
export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (e) {
      console.log(`error creating user:${e.message}`);
    }
  }

  return userDocRef;
};
