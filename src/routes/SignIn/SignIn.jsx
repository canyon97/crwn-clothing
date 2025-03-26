import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase.utils";

const SignIn = () => {
  const logGoogleUser = async () => {
    try {
      const {user} = await signInWithGooglePopup();
      console.log(user);
      await createUserDocumentFromAuth(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Login with Google</button>
    </div>
  );
};

export default SignIn;
