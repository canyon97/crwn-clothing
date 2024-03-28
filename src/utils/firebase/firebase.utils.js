import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwoaBw6fgyX0FM5QAlGC4Wy0y71B8sNx8",
  authDomain: "crwn-clothing-db-cc8e0.firebaseapp.com",
  projectId: "crwn-clothing-db-cc8e0",
  storageBucket: "crwn-clothing-db-cc8e0.appspot.com",
  messagingSenderId: "265341080202",
  appId: "1:265341080202:web:0d78f4d81b15de2c77d373",
};

initializeApp(firebaseConfig);

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  // We get reference for collection - if it does not exist, firebase will add it
  const collectionReference = collection(db, collectionKey);
  // Instantiate the batch connection to the db
  const batch = writeBatch(db);

  // Iterate over items in array
  objectsToAdd.forEach((item) => {
    const docRef = doc(collectionReference, item.title.toLowerCase());
    // Create new document reference to each item if not present
    batch.set(docRef, item);
  });

  // Commit the changes
  await batch.commit();
};

export const getCategoriesAndDocuments = async () => {
  // Define firebase reference to collection
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator, docSnapshot) => {
    // Destructure items
    const { title, items } = docSnapshot.data();
    // Assign each category to the items inside the category
    accumulator[title.toLowerCase()] = items;
    return accumulator;
  }, {});

  return categoryMap;
};

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalFields = {}
) => {
  if (!userAuth) {
    return;
  }

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
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
  }

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

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
