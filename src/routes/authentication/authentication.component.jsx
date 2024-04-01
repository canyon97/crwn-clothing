import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import { AuthenticationController } from "./authentication.styles.jsx";

const Authentication = () => {
  return (
    <AuthenticationController>
      <SignInForm></SignInForm>
      <SignUpForm></SignUpForm>
    </AuthenticationController>
  );
};

export default Authentication;
